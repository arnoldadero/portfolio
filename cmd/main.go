package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// API routes
	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		// Protected routes
		protected := api.Group("/protected")
		protected.Use(authMiddleware())
		{
			protected.GET("/projects", handleGetProjects)
			protected.POST("/projects", handleCreateProject)
			protected.PUT("/projects/:id", handleUpdateProject)
			protected.DELETE("/projects/:id", handleDeleteProject)
		}
	}

	log.Fatal(r.Run(":8080"))
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Implement JWT validation
		c.Next()
	}
}

func handleGetProjects(c *gin.Context) {
	// TODO: Implement project retrieval
	c.JSON(http.StatusOK, []gin.H{})
}

func handleCreateProject(c *gin.Context) {
	// TODO: Implement project creation
	c.JSON(http.StatusCreated, gin.H{})
}

func handleUpdateProject(c *gin.Context) {
	// TODO: Implement project update
	c.JSON(http.StatusOK, gin.H{})
}

func handleDeleteProject(c *gin.Context) {
	// TODO: Implement project deletion
	c.Status(http.StatusNoContent)
}
