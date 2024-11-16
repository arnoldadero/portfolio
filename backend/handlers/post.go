package handlers

import (
	"math"
	"blog-backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type PostHandler struct {
	db *gorm.DB
}

func NewPostHandler(db *gorm.DB) *PostHandler {
	return &PostHandler{db: db}
}

func (h *PostHandler) GetPosts(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)
	offset := (page - 1) * limit

	var posts []models.Post
	var total int64

	h.db.Model(&models.Post{}).Count(&total)
	
	if err := h.db.Preload("Author").Preload("Tags").
		Offset(offset).Limit(limit).
		Order("published_at DESC").
		Find(&posts).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to fetch posts",
		})
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))
	hasMore := page < totalPages

	return c.JSON(fiber.Map{
		"data": posts,
		"total": total,
		"currentPage": page,
		"totalPages": totalPages,
		"hasMore": hasMore,
	})
}
