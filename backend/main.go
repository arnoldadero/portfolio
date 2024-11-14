package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	initDB()
	router := setupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}

func initDB() {
	var err error
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	// Try connecting multiple times
	for i := 0; i < 5; i++ {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		log.Printf("Failed to connect to database (attempt %d/5): %v", i+1, err)
		time.Sleep(time.Second * 2)
	}
	if err != nil {
		log.Fatal("Failed to connect to database after 5 attempts:", err)
	}

	// Auto-migrate models
	if err := db.AutoMigrate(&User{}, &Post{}, &Activity{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Create admin user if it doesn't exist
	createAdminUser()

	log.Println("Successfully connected to database and migrated schemas")
}

func createAdminUser() {
	var user User
	if err := db.Where("email = ?", "aadero@admin.com").First(&user).Error; err != nil {
		// User doesn't exist, create it
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("09Octobe"), bcrypt.DefaultCost)
		if err != nil {
			log.Fatal("Failed to hash password:", err)
		}

		adminUser := User{
			Name:     "aadero",
			Email:    "aadero@admin.com",
			Password: string(hashedPassword),
		}

		if err := db.Create(&adminUser).Error; err != nil {
			log.Fatal("Failed to create admin user:", err)
		}
		log.Println("Admin user created successfully")
	}
}

func setupRouter() *gin.Engine {
	router := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowCredentials = true
	config.AddAllowHeaders("Authorization")
	router.Use(cors.New(config))

	// Public routes
	public := router.Group("/api")
	{
		public.POST("/auth/login", login)
		public.POST("/auth/register", register)
		public.GET("/posts", getPosts)
		public.GET("/posts/:slug", getPost)
	}

	// Protected routes
	protected := router.Group("/api")
	protected.Use(authMiddleware())
	{
		protected.POST("/posts", createPost)
		protected.PUT("/posts/:slug", updatePost)
		protected.DELETE("/posts/:slug", deletePost)
		protected.POST("/posts/:id/share/facebook", shareToFacebook)
		protected.POST("/posts/:id/share/linkedin", shareToLinkedIn)
		protected.GET("/activities", getActivities)
		protected.POST("/activities", createActivity)
	}

	return router
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		// Remove "Bearer " prefix
		token = token[7:]

		user, err := validateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("user", user)
		c.Next()
	}
}