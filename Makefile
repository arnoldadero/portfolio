.PHONY: all dev backend frontend install clean

all: dev

dev: install
	@make -j 2 backend frontend

backend:
	@echo "Starting Go backend..."
	@go run cmd/main.go

frontend:
	@echo "Starting React frontend..."
	@cd web && npm run dev

install:
	@echo "Installing dependencies..."
	@go mod tidy
	@cd web && npm install

clean:
	@echo "Cleaning up..."
	@rm -rf web/node_modules web/dist
	@go clean
