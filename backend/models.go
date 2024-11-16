package main

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"-"`
	Posts    []Post
}

type Post struct {
	gorm.Model
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	Excerpt    string    `json:"excerpt"`
	Slug       string    `json:"slug" gorm:"unique"`
	AuthorID   uint      `json:"author_id"`
	Author     User      `json:"author"`
	Tags       []string  `json:"tags" gorm:"type:text[]"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	SocialData string    `json:"social_data"`
}

type Activity struct {
	gorm.Model
	Type        string    `json:"type"`
	Description string    `json:"description"`
	UserID      uint      `json:"user_id"`
	User        User      `json:"user"`
	Links       []string  `json:"links" gorm:"type:text[]"`
	CreatedAt   time.Time `json:"created_at"`
}