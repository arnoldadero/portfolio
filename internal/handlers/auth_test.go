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

func setupTestRouter() *gin.Engine {
    gin.SetMode(gin.TestMode)
    r := gin.Default()
    database.DB, _ = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
    database.DB.AutoMigrate(&models.User{})

    r.POST("/register", Register)
    r.POST("/login", Login)

    return r
}

func TestRegister(t *testing.T) {
    router := setupTestRouter()

    payload := map[string]string{
        "username": "testuser",
        "email":    "test@example.com",
        "password": "password123",
    }
    body, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(body))
    req.Header.Set("Content-Type", "application/json")
    w := httptest.NewRecorder()

    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusCreated, w.Code)
}

func TestLogin(t *testing.T) {
    router := setupTestRouter()

    // Register user first
    database.DB.Create(&models.User{
        Username: "testuser",
        Email:    "test@example.com",
        Password: "$2a$10$7G0n6h/MTnKqF1kR9z5M1uI6Nn8rYHppkVx1Gz5hQjp0NzuYQ5Iq2", // Hashed 'password123'
    })

    payload := map[string]string{
        "email":    "test@example.com",
        "password": "password123",
    }
    body, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
    req.Header.Set("Content-Type", "application/json")
    w := httptest.NewRecorder()

    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusOK, w.Code)
    var response map[string]string
    json.Unmarshal(w.Body.Bytes(), &response)
    assert.NotEmpty(t, response["token"])
}