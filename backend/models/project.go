package models

import (
	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	Title           string   `json:"title" binding:"required"`
	Description     string   `json:"description" binding:"required"`
	ShortDescription string  `json:"shortDescription"`
	ImageURL        string   `json:"imageUrl,omitempty"`
	Technologies    []string `json:"technologies,omitempty" gorm:"type:text[]"`
	GithubURL       string   `json:"githubUrl,omitempty"`
	LiveURL         string   `json:"liveUrl,omitempty"`
	IsVisible       bool     `json:"isVisible" gorm:"default:true"`
	Category        string   `json:"category" gorm:"default:'other'"`
	Priority        int      `json:"priority" gorm:"default:0"`
	UserID          uint     `json:"user_id"`
	User            User     `json:"user,omitempty" gorm:"foreignKey:UserID"`
}
