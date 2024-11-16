package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

func main() {
	// Load .env file first
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	// Validate required environment variables
	requiredEnvVars := []string{"DATABASE_URL", "JWT_SECRET"}
	for _, env := range requiredEnvVars {
		if os.Getenv(env) == "" {
			log.Fatalf("Required environment variable %s is not set", env)
		}
	}

	// Set Gin to debug mode
	gin.SetMode(gin.DebugMode)

	// Initialize database
	initDB()
	
	// Setup router with specific address
	router := setupRouter()

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Add explicit network check
	address := fmt.Sprintf("0.0.0.0:%s", port)
	log.Printf("Server attempting to start on %s", address)
	
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatalf("Failed to create listener: %v", err)
	}
	defer listener.Close()
	
	log.Printf("Successfully bound to %s", address)
	
	if err := router.RunListener(listener); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

func initDB() {
	var err error
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	// Configure GORM to be less verbose
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error), // Only log errors
	})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Optimize connection pool
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to get database instance:", err)
	}

	// Set connection pool settings
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	// Auto-migrate models
	if err := db.AutoMigrate(&User{}, &Post{}, &Activity{}, &Skill{}, &Project{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Create admin user if it doesn't exist
	createAdminUser()

	log.Println("Successfully connected to database and migrated schemas")
}

func createAdminUser() {
	var user User
	// Remove Debug() call to reduce logging
	if err := db.Where("email = ?", "aadero@admin.com").First(&user).Error; err != nil {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("09Octobe"), bcrypt.DefaultCost)
		if err != nil {
			log.Fatal("Failed to hash password:", err)
		}

		adminUser := User{
			Name:     "aadero",
			Email:    "aadero@admin.com",
			Password: string(hashedPassword),
			IsAdmin:  true,
		}

		if err := db.Create(&adminUser).Error; err != nil {
			log.Fatal("Failed to create admin user:", err)
		}
		log.Println("Admin user created successfully")
	} else {
		// Ensure existing user has admin privileges
		if !user.IsAdmin {
			user.IsAdmin = true
			if err := db.Save(&user).Error; err != nil {
				log.Printf("Failed to update admin privileges: %v", err)
				return
			}
			log.Println("Updated existing user with admin privileges")
		} else {
			log.Println("Admin user already exists")
		}
	}
}

func setupRouter() *gin.Engine {
	router := gin.Default()

	// Update CORS configuration
	config := cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:5173", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(config))

	// Disable trusted proxies for now to rule out proxy issues
	router.SetTrustedProxies(nil)

	// Add health check endpoint
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Public routes
	public := router.Group("/api")
	{
		public.POST("/auth/login", login)
		public.GET("/posts/public", getPosts)             // Changed path
		public.GET("/posts/public/:slug", getPost)        // Changed path
		public.GET("/skills/public", getPublicSkills)     // Already fixed
		public.GET("/projects/public", getPublicProjects) // Already fixed
	}

	// Protected routes grouped by resource
	protected := router.Group("/api")
	protected.Use(authMiddleware())
	{
		// Posts routes
		protected.GET("/posts", getPosts)
		protected.POST("/posts", createPost)
		protected.PUT("/posts/:slug", updatePost)
		protected.DELETE("/posts/:slug", deletePost)
		protected.POST("/posts/:id/share/facebook", shareToFacebook)
		protected.POST("/posts/:id/share/linkedin", shareToLinkedIn)

		// Activities routes
		protected.GET("/activities", getActivities)
		protected.POST("/activities", createActivity)

		// Projects routes
		protected.GET("/projects", getProjects)
		protected.POST("/projects", createProject)
		protected.PUT("/projects/:id", updateProject)
		protected.DELETE("/projects/:id", deleteProject)
	}

	// Skills routes in dedicated group
	skillsGroup := router.Group("/api/skills")
	skillsGroup.Use(authMiddleware())
	{
		skillsGroup.GET("", getSkills)
		skillsGroup.POST("", createSkill)
		skillsGroup.PUT("/:id", updateSkill)
		skillsGroup.DELETE("/:id", deleteSkill)
		skillsGroup.PUT("/batch", batchUpdateSkills)
	}

	return router
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Skip auth for OPTIONS requests
		if c.Request.Method == "OPTIONS" {
			c.Next()
			return
		}

		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		// Check if token starts with "Bearer " prefix
		if len(token) > 7 && token[:7] == "Bearer " {
			// Remove "Bearer " prefix
		// Handle token length check
		if len(token) < 1 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
			c.Abort()
			return
		}

		// Handle token length check
		if len(token) < 8 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
			c.Abort()
			return
		}

		user, err := validateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("user", user)
		c.Next()
	}
}}

// getPublicSkills handles the GET request for public skills
func getPublicSkills(c *gin.Context) {
	var skills []Skill
	if err := db.Find(&skills).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve skills"})
		return
	}
	c.JSON(http.StatusOK, skills)
}

// updateProject handles the PUT request to update a project
func updateProject(c *gin.Context) {
	id := c.Param("id")
	var project Project
	if err := db.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.Save(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
		return
	}

	c.JSON(http.StatusOK, project)
}

// deleteProject handles the DELETE request to remove a project
func deleteProject(c *gin.Context) {
	id := c.Param("id")
	var project Project
	if err := db.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	if err := db.Delete(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Project deleted successfully"})
}

// getPublicProjects handles the GET request for public projects
func getPublicProjects(c *gin.Context) {
	var projects []Project
	if err := db.Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve projects"})
		return
	}
	c.JSON(http.StatusOK, projects)
}

// Models
type Skill struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"`
	Level     int       `json:"level"`
	Category  string    `json:"category"`
	Logo      string    `json:"logo"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Project struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Tech        []string  `gorm:"type:text[]" json:"tech"`
	Github      string    `json:"github"`
	Demo        string    `json:"demo"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
