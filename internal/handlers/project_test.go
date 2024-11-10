// internal/handlers/project_test.go
package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/arnoldadero/portfolio/internal/database"
	"github.com/arnoldadero/portfolio/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB(t *testing.T) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("Failed to connect to test database: %v", err)
	}

	err = db.AutoMigrate(&models.Project{})
	if err != nil {
		t.Fatalf("Failed to migrate test database: %v", err)
	}

	database.DB = db
}

func TestGetProjects(t *testing.T) {
	setupTestDB(t)

	// Create test project
	testProject := models.Project{
		Title:       "Test Project",
		Description: "Test Description",
		GitHubURL:   "https://github.com/test",
	}
	database.DB.Create(&testProject)

	// Setup router and request
	r := gin.Default()
	r.GET("/api/projects", GetProjects)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/projects", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response []models.Project
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, 1, len(response))
	assert.Equal(t, testProject.Title, response[0].Title)
}

func TestCreateProject(t *testing.T) {
	setupTestDB(t)

	r := gin.Default()
	r.POST("/api/projects", CreateProject)

	project := models.Project{
		Title:       "New Project",
		Description: "New Description",
		GitHubURL:   "https://github.com/new",
	}

	jsonValue, _ := json.Marshal(project)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/projects", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)

	var response models.Project
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, project.Title, response.Title)
}

func TestUpdateProject(t *testing.T) {
	setupTestDB(t)

	// Create initial project
	project := models.Project{
		Title: "Initial Title",
	}
	database.DB.Create(&project)

	r := gin.Default()
	r.PUT("/api/projects/:id", UpdateProject)

	updatedProject := models.Project{
		Title: "Updated Title",
	}

	jsonValue, _ := json.Marshal(updatedProject)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("PUT", "/api/projects/1", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response models.Project
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, updatedProject.Title, response.Title)
}

func TestDeleteProject(t *testing.T) {
	setupTestDB(t)

	// Create project to delete
	project := models.Project{
		Title: "To Delete",
	}
	database.DB.Create(&project)

	r := gin.Default()
	r.DELETE("/api/projects/:id", DeleteProject)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/api/projects/1", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	// Verify deletion
	var count int64
	database.DB.Model(&models.Project{}).Count(&count)
	assert.Equal(t, int64(0), count)
}
