package main

import (
	"github.com/golang-jwt/jwt"
	"github.com/gosimple/slug"
	"os"
	"strings"
	"time"
)

func generateTitleSlug(title string) string {
	return slug.Make(title)
}

func validateToken(tokenStr string) (User, error) {
	// Remove "Bearer " prefix if present
	tokenStr = strings.TrimPrefix(tokenStr, "Bearer ")
	
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
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

func generateToken(user User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
