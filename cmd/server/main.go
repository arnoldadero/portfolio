// cmd/server/main.go
package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/arnoldadero/portfolio/internal/database"
	"github.com/arnoldadero/portfolio/internal/handlers"
	"github.com/arnoldadero/portfolio/internal/middleware"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found")
	}

	// Set Gin mode
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Connect to database
	database.Connect()

	r := gin.Default()

	// Add recovery middleware
	r.Use(gin.Recovery())

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.Use(middleware.ErrorHandler())

	// Public routes
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	// Protected routes
	api := r.Group("/api")
	api.Use(middleware.AuthMiddleware(os.Getenv("JWT_SECRET")))
	{
		api.GET("/projects", handlers.GetProjects)
		api.POST("/projects", handlers.CreateProject)
		api.GET("/projects/:id", handlers.GetProjectByID)
		api.PUT("/projects/:id", handlers.UpdateProject)
		api.DELETE("/projects/:id", handlers.DeleteProject)
	}

	// Health check route
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
