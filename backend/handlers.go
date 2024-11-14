package main

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func login(c *gin.Context) {
	var input struct {
		EmailOrUsername string `json:"emailOrUsername" binding:"required"`
		Password        string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user User
	if err := db.Debug().Where("email = ? OR name = ?", input.EmailOrUsername, input.EmailOrUsername).First(&user).Error; err != nil {
		log.Printf("User not found: %v", err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email/username or password",
		})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		log.Printf("Password mismatch for user %s: %v", user.Email, err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email/username or password",
		})
		return
	}

	if !user.IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Account does not have admin privileges",
		})
		return
	}

	token, err := generateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":      user.ID,
			"name":    user.Name,
			"email":   user.Email,
			"isAdmin": user.IsAdmin,
		},
	})
}

func getPosts(c *gin.Context) {
	var posts []Post
	if err := db.Preload("Author").Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}

	for i := range posts {
		if posts[i].Author.ID == 0 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Author relationship not properly set up"})
			return
		}
	}
	page := c.DefaultQuery("page", "1")
	pageSize := c.DefaultQuery("pageSize", "10")

	pageInt, err := strconv.Atoi(page)
	if err != nil || pageInt < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
		return
	}

	pageSizeInt, err := strconv.Atoi(pageSize)
	if err != nil || pageSizeInt < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page size"})
		c.JSON(http.StatusOK, gin.H{"posts": posts})
	}

	offset := (pageInt - 1) * pageSizeInt

	if err := db.Preload("Author").Limit(pageSizeInt).Offset(offset).Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}

	c.JSON(http.StatusOK, posts)
}

func getPost(c *gin.Context) {
	slug := c.Param("slug")

	var post Post
	if err := db.Preload("Author").Where("slug = ?", slug).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	c.JSON(http.StatusOK, post)
}

func createPost(c *gin.Context) {
	var input struct {
		Title   string   `json:"title" binding:"required"`
		Content string   `json:"content" binding:"required"`
		Excerpt string   `json:"excerpt" binding:"required"`
		Tags    []string `json:"tags"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := c.MustGet("user").(User)

	post := Post{
		Title:    input.Title,
		Content:  input.Content,
		Excerpt:  input.Excerpt,
		Tags:     input.Tags,
		AuthorID: user.ID,
		Slug:     generateSlug(input.Title),
	}

	if err := db.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}

	c.JSON(http.StatusCreated, post)
}

func generateSlug(s string) string {
	return generateTitleSlug(s)
}

func updatePost(c *gin.Context) {
	slug := c.Param("slug")
	user := c.MustGet("user").(User)

	var post Post
	if err := db.Where("slug = ? AND author_id = ?", slug, user.ID).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	var input struct {
		Title   string   `json:"title"`
		Content string   `json:"content"`
		Excerpt string   `json:"excerpt"`
		Tags    []string `json:"tags"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post.Title = input.Title
	post.Content = input.Content
	post.Excerpt = input.Excerpt
	post.Tags = input.Tags

	if err := db.Save(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
		return
	}

	c.JSON(http.StatusOK, post)
}

func deletePost(c *gin.Context) {
	slug := c.Param("slug")
	user := c.MustGet("user").(User)

	var post Post
	if err := db.Where("slug = ? AND author_id = ?", slug, user.ID).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	if err := db.Delete(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Post deleted successfully"})
}

func shareToFacebook(c *gin.Context) {
	// Implement Facebook sharing logic
	c.JSON(http.StatusOK, gin.H{"message": "Shared to Facebook"})
}

func shareToLinkedIn(c *gin.Context) {
	// Implement LinkedIn sharing logic
	c.JSON(http.StatusOK, gin.H{"message": "Shared to LinkedIn"})
}

func getActivities(c *gin.Context) {
	user := c.MustGet("user").(User)

	var activities []Activity
	if err := db.Where("user_id = ?", user.ID).Find(&activities).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch activities"})
		return
	}

	c.JSON(http.StatusOK, activities)
}

func createActivity(c *gin.Context) {
	var input struct {
		Type        string   `json:"type" binding:"required"`
		Description string   `json:"description" binding:"required"`
		Links       []string `json:"links"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := c.MustGet("user").(User)

	activity := Activity{
		Type:        input.Type,
		Description: input.Description,
		Links:       input.Links,
		UserID:      user.ID,
	}

	if err := db.Create(&activity).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create activity"})
		return
	}

	c.JSON(http.StatusCreated, activity)
}
