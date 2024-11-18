package utils

import (
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"blog-backend/models"

	"github.com/golang-jwt/jwt"
	"github.com/gosimple/slug"
	"path/filepath"
)

func GenerateToken(user models.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func ValidateToken(tokenString string, db interface{}) (jwt.MapClaims, error) {
	log.Printf("Validating token: %s", tokenString)
	secret := os.Getenv("JWT_SECRET")
	log.Printf("Using JWT secret: %s", secret)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})

	if err != nil {
		log.Printf("Token parsing error: %v", err)
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		log.Printf("Token claims: %+v", claims)
		return claims, nil
	}

	log.Printf("Invalid token claims or signature")
	return nil, fmt.Errorf("invalid token claims or signature")
}

// GenerateSlug creates a URL-friendly version of a string
func GenerateSlug(title string) string {
	return slug.Make(strings.ToLower(title))
}

// GenerateUniqueFilename creates a unique filename by adding a timestamp
func GenerateUniqueFilename(originalName string) string {
	ext := filepath.Ext(originalName)
	name := strings.TrimSuffix(originalName, ext)
	timestamp := time.Now().UnixNano()
	return fmt.Sprintf("%s_%d%s", name, timestamp, ext)
}
