package main

import (
	"log"
	"os"

	"blog-backend/config"
	"blog-backend/handlers"
	"blog-backend/middleware"
	"blog-backend/models"
	"blog-backend/repository"
	"blog-backend/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

var db *gorm.DB

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize database
	var err error
	db, err = config.InitDatabase()
	if err != nil {
		log.Fatal("Failed to initialize database:", err)
	}

	// Explicitly reference db to remove unused variable warning
	_ = db

	// Auto-migrate models
	if err := db.AutoMigrate(&models.User{}, &models.Post{}, &models.Activity{}, &models.Project{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Initialize layers
	repo := repository.NewRepository(db)
	svc := service.NewService(repo)
	handler := handlers.NewHandler(svc)

	router := gin.Default()

	// CORS configuration
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:8081"}
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowHeaders("Authorization")
	router.Use(cors.New(corsConfig))

	// Public routes
	public := router.Group("/api")
	{
		public.POST("/auth/login", handler.Login)
		public.GET("/posts", handler.GetPosts)
		public.GET("/posts/:slug", handler.GetPost)
		public.GET("/projects", handler.GetProjects)
	}

	// Protected routes
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		// Auth routes
		protected.GET("/auth/verify", handler.Verify)

		// Project routes
		protected.POST("/projects", handler.CreateProject)
		protected.PUT("/projects/:id", handler.UpdateProject)
		protected.DELETE("/projects/:id", handler.DeleteProject)
		protected.POST("/upload", handler.UploadImage)

		// Post routes
		protected.POST("/posts", handler.CreatePost)
		protected.PUT("/posts/:slug", handler.UpdatePost)
		protected.DELETE("/posts/:slug", handler.DeletePost)

		// Activity routes
		protected.GET("/activities", handler.GetActivities)
		protected.POST("/activities", handler.CreateActivity)
	}
	// Serve uploaded files
	router.Static("/uploads", "./uploads")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
