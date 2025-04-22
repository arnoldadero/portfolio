package main

import (
	"blog-backend/models"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	if err := godotenv.Load("../.env"); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Build the DSN string directly
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	// Connect to database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate the schema
	err = db.AutoMigrate(&models.User{}, &models.Post{}, &models.Project{}, &models.Activity{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Create test user
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("12345678A"), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("Failed to hash password:", err)
	}

	testUser := models.User{
		Name:     "test",
		Email:    "test@example.com",
		Password: string(hashedPassword),
	}

	// Check if user already exists
	var existingUser models.User
	if err := db.Where("email = ?", testUser.Email).First(&existingUser).Error; err == nil {
		log.Println("Test user already exists")
		return
	}

	// Create the user
	if err := db.Create(&testUser).Error; err != nil {
		log.Fatal("Failed to create test user:", err)
	}

	log.Println("Test user created successfully")
}
