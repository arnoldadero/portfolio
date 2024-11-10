package middleware

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v4"
    "github.com/stretchr/testify/assert"
)

func setupTestRouter() *gin.Engine {
    gin.SetMode(gin.TestMode)
    r := gin.New()
    
    const secretKey = "test-secret-key"

    r.Use(AuthMiddleware(secretKey))
    r.POST("/register", func(c *gin.Context) {
        var payload map[string]string
        if err := c.ShouldBindJSON(&payload); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
            "user_id": 1,
        })
        tokenString, _ := token.SignedString([]byte(secretKey))
        c.JSON(http.StatusOK, gin.H{"token": tokenString})
    })
    return r
}

func TestAuthMiddleware(t *testing.T) {
    router := setupTestRouter()
    
    // Create a protected route
    router.GET("/protected", AuthMiddleware("test-secret-key"), func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"status": "success"})
    })

    // Test without token
    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/protected", nil)
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusUnauthorized, w.Code)

    // Register and get token
    registerPayload := map[string]string{
        "username": "testuser",
        "email":    "test@example.com",
        "password": "password123",
    }
    body, _ := json.Marshal(registerPayload)
    
    w = httptest.NewRecorder()
    req, _ = http.NewRequest("POST", "/register", bytes.NewBuffer(body))
    req.Header.Set("Content-Type", "application/json")
    router.ServeHTTP(w, req)
    
    var response map[string]string
    json.Unmarshal(w.Body.Bytes(), &response)
    token := response["token"]

    // Test protected route with valid token
    w = httptest.NewRecorder()
    req, _ = http.NewRequest("GET", "/protected", nil)
    req.Header.Set("Authorization", "Bearer "+token)
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusOK, w.Code)
}