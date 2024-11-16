package main

import (
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/gosimple/slug"
)

/* Key Utilities:
1. String manipulation helpers
2. URL-friendly slug generation
3. Token validation and generation
*/

func generateToken(user User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func validateToken(tokenString string) (User, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return User{}, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		var user User
		if err := db.First(&user, claims["user_id"]).Error; err != nil {
			return User{}, err
		}
		return user, nil
	}

	return User{}, jwt.ErrSignatureInvalid
}

// generateSlug creates a URL-friendly version of a string
// Converts spaces to hyphens and removes special characters
func generateSlug(title string) string {
	return slug.Make(strings.ToLower(title))
}