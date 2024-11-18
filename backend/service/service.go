package service

import (
	"blog-backend/models"
	"blog-backend/repository"
	"blog-backend/utils"
	"errors"
	"golang.org/x/crypto/bcrypt"
)

// Service handles business logic
type Service struct {
	repo *repository.Repository
}

// NewService creates a new service instance
func NewService(repo *repository.Repository) *Service {
	return &Service{repo: repo}
}

// Auth operations
func (s *Service) Login(email, password string) (*models.User, string, error) {
	user, err := s.repo.FindUserByEmail(email)
	if err != nil {
		return nil, "", errors.New("invalid credentials")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, "", errors.New("invalid credentials")
	}

	token, err := utils.GenerateToken(*user)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (s *Service) Register(name, email, password string) (*models.User, string, error) {
	// Check if user exists
	if _, err := s.repo.FindUserByEmail(email); err == nil {
		return nil, "", errors.New("email already registered")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}

	user := &models.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
	}

	if err := s.repo.CreateUser(user); err != nil {
		return nil, "", err
	}

	token, err := utils.GenerateToken(*user)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

// Post operations
func (s *Service) ListPosts() ([]models.Post, error) {
	return s.repo.ListPosts()
}

func (s *Service) GetPost(slug string) (*models.Post, error) {
	return s.repo.FindPostBySlug(slug)
}

func (s *Service) CreatePost(post *models.Post) error {
	return s.repo.CreatePost(post)
}

func (s *Service) UpdatePost(post *models.Post) error {
	return s.repo.UpdatePost(post)
}

func (s *Service) DeletePost(slug string) error {
	return s.repo.DeletePost(slug)
}

// Project operations
func (s *Service) ListProjects() ([]models.Project, error) {
	return s.repo.ListProjects()
}

func (s *Service) GetProject(id uint) (*models.Project, error) {
	return s.repo.FindProjectByID(id)
}

func (s *Service) CreateProject(project *models.Project) error {
	return s.repo.CreateProject(project)
}

func (s *Service) UpdateProject(project *models.Project) error {
	return s.repo.UpdateProject(project)
}

func (s *Service) DeleteProject(id uint) error {
	return s.repo.DeleteProject(id)
}

// Activity operations
func (s *Service) ListActivities() ([]models.Activity, error) {
	return s.repo.ListActivities()
}

func (s *Service) CreateActivity(activity *models.Activity) error {
	return s.repo.CreateActivity(activity)
}

// User operations
func (s *Service) GetUserByID(id uint) (*models.User, error) {
	return s.repo.FindUserByID(id)
}
