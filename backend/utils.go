package main

import (
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/gosimple/slug"
)

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

func generateSlug(title string) string {
	return slug.Make(strings.ToLower(title))
}