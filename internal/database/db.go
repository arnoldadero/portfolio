package database

import (
    "fmt"
    "log"
    "os"
    "time"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "github.com/arnoldadero/portfolio/internal/models"
)

var DB *gorm.DB

func Connect() {
    maxRetries := 10
    var err error
    
    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
        os.Getenv("DB_PORT"),
    )

    for i := 0; i < maxRetries; i++ {
        DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
        if err == nil {
            break
        }
        log.Printf("Failed to connect to database (attempt %d/%d): %v", i+1, maxRetries, err)
        time.Sleep(time.Second * 5)
    }

    if err != nil {
        log.Fatal("Failed to connect to database after multiple retries:", err)
    }

    // Auto migrate models
    if err := DB.AutoMigrate(&models.User{}, &models.Project{}, &models.BlogPost{}); err != nil {
        log.Fatal("Failed to migrate database:", err)
    }

    log.Println("Database connected and migrated successfully")
}