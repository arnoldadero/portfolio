package models

import "time"

type BlogPost struct {
    ID        uint      `json:"id" gorm:"primaryKey"`
    Title     string    `json:"title"`
    Content   string    `json:"content"`
    Tags      string    `json:"tags"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}