package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
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

// Database configuration
// - Uses environment variables for security
// - Implements GORM for ORM functionality
// - PostgreSQL as the database backend
func initDB() {
	var err error
	dsn := os.Getenv("DATABASE_URL")
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// // Auto-migrate models
	// if err := db.AutoMigrate(&User{}, &Post{}, &Activity{}); err != nil {
	// 	log.Fatal("Failed to migrate database:", err)
	// }
}

// Router setup
// - Implements CORS for local development
// - Separates routes into public and protected groups
// - Uses middleware for authentication
// - Implements RESTful endpoints for posts and activities
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

// Authentication middleware
// - Validates JWT tokens
// - Extracts user information
// - Protects sensitive routes
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