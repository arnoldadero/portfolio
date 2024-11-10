package models

import "time"

type Project struct {
    ID          uint      `json:"id" gorm:"primaryKey"`
    Title       string    `json:"title"`
    Description string    `json:"description"`
    ImageURL    string    `json:"image_url"`
    LiveURL     string    `json:"live_url"`
    GitHubURL   string    `json:"github_url"`
    TechStack   string    `json:"tech_stack"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}