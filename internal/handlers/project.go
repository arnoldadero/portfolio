// internal/handlers/project.go
package handlers

import (
    "net/http"

    "github.com/arnoldadero/portfolio/internal/database"
    "github.com/arnoldadero/portfolio/internal/models"
    "github.com/gin-gonic/gin"
)

func GetProjects(c *gin.Context) {
    var projects []models.Project
    result := database.DB.Find(&projects)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
        return
    }
    c.JSON(http.StatusOK, projects)
}

func CreateProject(c *gin.Context) {
    var project models.Project
    if err := c.ShouldBindJSON(&project); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    result := database.DB.Create(&project)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
        return
    }
    c.JSON(http.StatusCreated, project)
}

func GetProjectByID(c *gin.Context) {
    id := c.Param("id")
    var project models.Project
    
    result := database.DB.First(&project, id)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
        return
    }
    
    c.JSON(http.StatusOK, project)
}

func UpdateProject(c *gin.Context) {
    id := c.Param("id")
    var project models.Project
    
    // Check if project exists
    if err := database.DB.First(&project, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
        return
    }
    
    // Bind new data
    if err := c.ShouldBindJSON(&project); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    // Save updates
    if err := database.DB.Save(&project).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
        return
    }
    
    c.JSON(http.StatusOK, project)
}

func DeleteProject(c *gin.Context) {
    id := c.Param("id")
    var project models.Project
    
    // Check if project exists
    if err := database.DB.First(&project, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
        return
    }
    
    // Delete project
    if err := database.DB.Delete(&project).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{"message": "Project deleted successfully"})
}
