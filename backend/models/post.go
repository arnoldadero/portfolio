package models

import (
	"gorm.io/gorm"
	"time"
)

type Post struct {
	gorm.Model
	Title       string    `json:"title" binding:"required"`
	Content     string    `json:"content" binding:"required"`
	Excerpt     string    `json:"excerpt" binding:"required"`
	Slug        string    `json:"slug" gorm:"uniqueIndex"`
	Published   bool      `json:"published" gorm:"default:false"`
	PublishedAt *time.Time `json:"publishedAt,omitempty"`
	Likes       int       `json:"likes" gorm:"default:0"`
	Views       int       `json:"views" gorm:"default:0"`
	ReadTime    int       `json:"readTime" gorm:"default:0"`
	AuthorID    uint      `json:"author_id"`
	Author      User      `json:"author,omitempty" gorm:"foreignKey:AuthorID"`
	Tags        []string  `json:"tags,omitempty" gorm:"type:text[]"`
	SocialData  string    `json:"social_data,omitempty"`
}

type Author struct {
	gorm.Model
	Name  string `json:"name"`
	Email string `json:"email"`
	Posts []Post `json:"posts"`
}

type Tag struct {
	gorm.Model
	Name  string `json:"name" gorm:"uniqueIndex"`
	Posts []Post `json:"posts" gorm:"many2many:post_tags;"`
}
