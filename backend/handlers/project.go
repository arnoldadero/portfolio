package handlers

import (
	"net/http"
	"os"
	"path/filepath"

	"blog-backend/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ProjectHandler struct {
	db *gorm.DB
}

func NewProjectHandler(db *gorm.DB) *ProjectHandler {
	return &ProjectHandler{db: db}
}

func (h *ProjectHandler) GetProjects(c *gin.Context) {
	var projects []models.Project
	if err := h.db.Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	c.JSON(http.StatusOK, projects)
}

func (h *ProjectHandler) CreateProject(c *gin.Context) {
	var input struct {
		Title        string   `json:"title" binding:"required"`
		Description  string   `json:"description" binding:"required"`
		ImageURL     string   `json:"imageUrl"`
		Technologies []string `json:"technologies"`
		GithubURL    string   `json:"githubUrl"`
		LiveURL      string   `json:"liveUrl"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	project := models.Project{
		Title:        input.Title,
		Description:  input.Description,
		ImageURL:     input.ImageURL,
		Technologies: input.Technologies,
		GithubURL:    input.GithubURL,
		LiveURL:      input.LiveURL,
	}

	if err := h.db.Create(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
		return
	}

	c.JSON(http.StatusCreated, project)
}

func (h *ProjectHandler) UpdateProject(c *gin.Context) {
	id := c.Param("id")
	var project models.Project

	// Check if project exists
	if err := h.db.First(&project, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	var input struct {
		Title        string   `json:"title" binding:"required"`
		Description  string   `json:"description" binding:"required"`
		ImageURL     string   `json:"imageUrl"`
		Technologies []string `json:"technologies"`
		GithubURL    string   `json:"githubUrl"`
		LiveURL      string   `json:"liveUrl"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update project fields
	project.Title = input.Title
	project.Description = input.Description
	project.ImageURL = input.ImageURL
	project.Technologies = input.Technologies
	project.GithubURL = input.GithubURL
	project.LiveURL = input.LiveURL

	if err := h.db.Save(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
		return
	}

	c.JSON(http.StatusOK, project)
}

func (h *ProjectHandler) DeleteProject(c *gin.Context) {
	id := c.Param("id")
	var project models.Project

	// Check if project exists
	if err := h.db.First(&project, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	// Delete the project
	if err := h.db.Delete(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Project deleted successfully"})
}

func (h *ProjectHandler) UploadImage(c *gin.Context) {
	// Check if uploads directory exists
	uploadDir := filepath.Join("uploads", "projects")
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	// Validate file type
	ext := filepath.Ext(file.Filename)
	if ext != ".jpg" && ext != ".jpeg" && ext != ".png" && ext != ".gif" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file type. Only jpg, jpeg, png, and gif are allowed"})
		return
	}

	// Generate unique filename
	filename := uuid.New().String() + ext
	filepath := filepath.Join(uploadDir, filename)

	// Save the file
	if err := c.SaveUploadedFile(file, filepath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	imageURL := "/uploads/projects/" + filename
	c.JSON(http.StatusOK, gin.H{"imageUrl": imageURL})
}
