package main

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"-"`
	IsAdmin  bool   `json:"isAdmin"`
}

type Post struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `json:"title"`
	Slug      string    `gorm:"uniqueIndex" json:"slug"`
	Content   string    `json:"content"`
	Excerpt   string    `json:"excerpt"`
	Tags      []string  `gorm:"type:text[]" json:"tags"`
	AuthorID  uint      `json:"authorId"`
	Author    User      `gorm:"foreignKey:AuthorID" json:"author"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Activity struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Type        string    `json:"type"`
	Description string    `json:"description"`
	Links       []string  `gorm:"type:text[]" json:"links"`
	UserID      uint      `json:"userId"`
	User        User      `gorm:"foreignKey:UserID" json:"user"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}