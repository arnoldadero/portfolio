package models

import (
    "time"
    "gorm.io/gorm"
)

type Post struct {
    gorm.Model
    Title       string    `json:"title"`
    Slug        string    `json:"slug" gorm:"uniqueIndex"`
    Content     string    `json:"content"`
    Excerpt     string    `json:"excerpt"`
    AuthorID    uint      `json:"authorId"`
    Author      Author    `json:"author"`
    Tags        []Tag     `json:"tags" gorm:"many2many:post_tags;"`
    PublishedAt time.Time `json:"publishedAt"`
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
