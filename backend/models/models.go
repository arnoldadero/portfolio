package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string    `json:"name" binding:"required"`
	Email    string    `json:"email" binding:"required,email" gorm:"uniqueIndex"`
	Password string    `json:"-" binding:"required,min=6"`
	Avatar   string    `json:"avatar,omitempty"`
	IsAdmin  bool      `json:"isAdmin" gorm:"default:false"`
	Posts    []Post    `json:"posts,omitempty" gorm:"foreignKey:AuthorID"`
	Projects []Project `json:"projects,omitempty" gorm:"foreignKey:UserID"`
}


type Activity struct {
	gorm.Model
	Type        string   `json:"type" binding:"required"`
	Description string   `json:"description" binding:"required"`
	UserID      uint     `json:"user_id"`
	User        User     `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Links       []string `json:"links,omitempty" gorm:"type:text[]"`
}
