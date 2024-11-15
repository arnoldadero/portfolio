package main

import (
	"fmt"
	"log"
	"math"
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
	dbQuery := db
	if gin.Mode() == gin.DebugMode {
		dbQuery = db.Debug()
	}
	if err := dbQuery.Where("email = ? OR name = ?", input.EmailOrUsername, input.EmailOrUsername).First(&user).Error; err != nil {
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

	response := gin.H{
		"token": token,
		"user": gin.H{
			"id":      user.ID,
			"name":    user.Name,
			"email":   user.Email,
			"isAdmin": user.IsAdmin,
		},
	}

	c.JSON(http.StatusOK, response)
}

func getPosts(c *gin.Context) {
	var posts []Post
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
		return
	}

	offset := (pageInt - 1) * pageSizeInt

	if err := db.Preload("Author").Limit(pageSizeInt).Offset(offset).Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}

	for i := range posts {
		if posts[i].Author.ID == 0 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Author relationship not properly set up"})
			return
		}
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
		Slug:     generateSlug(input.Title),
		Content:  input.Content,
		Excerpt:  input.Excerpt,
		Tags:     input.Tags,
		AuthorID: user.ID,
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

// Skills handlers
func getSkills(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "10")
	sortBy := c.DefaultQuery("sortBy", "name")
	sortOrder := c.DefaultQuery("sortOrder", "asc")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
		return
	}

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit"})
		return
	}

	offset := (page - 1) * limit
	var skills []Skill
	var total int64

	baseQuery := db.Model(&Skill{})

	// Apply search if query parameter exists
	if search := c.Query("q"); search != "" {
		baseQuery = baseQuery.Where("name ILIKE ? OR category ILIKE ?",
			"%"+search+"%", "%"+search+"%")
	}

	// Get total count
	if err := baseQuery.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Apply sorting and pagination
	if err := baseQuery.Order(fmt.Sprintf("%s %s", sortBy, sortOrder)).
		Offset(offset).
		Limit(limit).
		Find(&skills).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       skills,
		"total":      total,
		"page":       page,
		"limit":      limit,
		"totalPages": int(math.Ceil(float64(total) / float64(limit))),
	})
}

func createSkill(c *gin.Context) {
	var skill Skill
	if err := c.ShouldBindJSON(&skill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&skill).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, skill)
}

func batchUpdateSkills(c *gin.Context) {
    var input struct {
        Updates []struct {
            ID   uint                   `json:"id"`
            Data map[string]interface{} `json:"data"`
        } `json:"updates"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Start transaction
    tx := db.Begin()

    for _, update := range input.Updates {
        var skill Skill
        if err := tx.First(&skill, update.ID).Error; err != nil {
            tx.Rollback()
            c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Skill %d not found", update.ID)})
            return
        }

        if err := tx.Model(&skill).Updates(update.Data).Error; err != nil {
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }

    if err := tx.Commit().Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Skills updated successfully"})
}

// Projects handlers
func getProjects(c *gin.Context) {
	var projects []Project
	if err := db.Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, projects)
}

func createProject(c *gin.Context) {
	var project Project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, project)
}

func updateSkill(c *gin.Context) {
	id := c.Param("id")
	var skill Skill

	if err := db.First(&skill, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
		return
	}

	var input struct {
		Name     string `json:"name"`
		Level    int    `json:"level"`
		Category string `json:"category"`
		Logo     string `json:"logo"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	skill.Name = input.Name
	skill.Level = input.Level
	skill.Category = input.Category
	if input.Logo != "" {
		skill.Logo = input.Logo
	}

	if err := db.Save(&skill).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update skill"})
		return
	}

	c.JSON(http.StatusOK, skill)
}

func deleteSkill(c *gin.Context) {
	id := c.Param("id")

	result := db.Delete(&Skill{}, id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete skill"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Skill deleted successfully"})
}
