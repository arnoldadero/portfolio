// internal/handlers/project.go
package handlers

import (
	"github.com/arnoldadero/portfolio/internal/database"
	"github.com/arnoldadero/portfolio/internal/models"
	"github.com/gin-gonic/gin"
)

func GetProjects(c *gin.Context) {
	var projects []models.Project
	result := database.DB.Find(&projects)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch projects"})
		return
	}
	c.JSON(200, projects)
}

func CreateProject(c *gin.Context) {
	var project models.Project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result := database.DB.Create(&project)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create project"})
		return
	}
	c.JSON(201, project)
}
