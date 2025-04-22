package repository

import (
	"blog-backend/models"
	"gorm.io/gorm"
)

// Repository provides all database operations
type Repository struct {
	db *gorm.DB
}

// NewRepository creates a new repository instance
func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

// User operations
func (r *Repository) FindUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *Repository) FindUserByID(id uint) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *Repository) CreateUser(user *models.User) error {
	return r.db.Create(user).Error
}

// Post operations
func (r *Repository) ListPosts() ([]models.Post, error) {
	var posts []models.Post
	err := r.db.Preload("Author").Order("created_at desc").Find(&posts).Error
	return posts, err
}

func (r *Repository) FindPostBySlug(slug string) (*models.Post, error) {
	var post models.Post
	err := r.db.Preload("Author").Where("slug = ?", slug).First(&post).Error
	if err != nil {
		return nil, err
	}
	return &post, nil
}

func (r *Repository) CreatePost(post *models.Post) error {
	return r.db.Create(post).Error
}

func (r *Repository) UpdatePost(post *models.Post) error {
	return r.db.Save(post).Error
}

func (r *Repository) DeletePost(slug string) error {
	return r.db.Where("slug = ?", slug).Delete(&models.Post{}).Error
}

// Project operations
func (r *Repository) ListProjects() ([]models.Project, error) {
	var projects []models.Project
	err := r.db.Order("priority desc").Find(&projects).Error
	return projects, err
}

func (r *Repository) FindProjectByID(id uint) (*models.Project, error) {
	var project models.Project
	err := r.db.First(&project, id).Error
	if err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *Repository) CreateProject(project *models.Project) error {
	return r.db.Create(project).Error
}

func (r *Repository) UpdateProject(project *models.Project) error {
	return r.db.Save(project).Error
}

func (r *Repository) DeleteProject(id uint) error {
	return r.db.Delete(&models.Project{}, id).Error
}

// Activity operations
func (r *Repository) ListActivities() ([]models.Activity, error) {
	var activities []models.Activity
	err := r.db.Preload("User").Order("created_at desc").Find(&activities).Error
	return activities, err
}

func (r *Repository) CreateActivity(activity *models.Activity) error {
	return r.db.Create(activity).Error
}
