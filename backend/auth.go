package main

import (
	"errors"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

func GenerateUserToken(user User) (string, error) {
	// Validate JWT secret
	if secret := os.Getenv("JWT_SECRET"); len(secret) < 32 {
		return "", errors.New("invalid JWT_SECRET configuration")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"admin":   user.IsAdmin,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(),
		"iat":     time.Now().Unix(),
		"jti":     uuid.NewString(),
	})

	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func ValidateUserToken(tokenString string) (User, error) {
	// Remove "Bearer " prefix if present
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Verify signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return User{}, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Verify token expiration
		if !claims.VerifyExpiresAt(time.Now().Unix(), true) {
			return User{}, errors.New("token expired")
		}

		var user User
		if err := db.First(&user, claims["user_id"]).Error; err != nil {
			return User{}, err
		}
		return user, nil
	}

	return User{}, jwt.ErrSignatureInvalid
}