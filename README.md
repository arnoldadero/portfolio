# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and TailwindCSS showcasing projects, skills, and professional experience.

## 🚀 Features

- **Modern UI/UX Design** 
    - Clean, responsive layout
    - Smooth animations and transitions
    - Gradient accents and blur effects
    - Dark/light mode support

- **Project Showcase**
    - GitHub integration showing live repositories
    - Language statistics with animated progress bars
    - Project filtering and sorting capabilities
    - Live demo and source code links

- **Skills Section**  
    - Categorized technical skills
    - Interactive skill cards with hover effects
    - Progress indicators for proficiency levels
    - Icon integration for technologies

- **Blog Integration**
    - Markdown blog posts support
    - Social sharing capabilities
    - Author and metadata display
    - Reading time estimates

## 🛠️ Tech Stack

- **Frontend**
    - React
    - TypeScript
    - TailwindCSS
    - React Query
    - Lucide Icons

- **Backend** 
    - Go
    - Gin
    - GORM
    - PostgreSQL

## 🌐 Deployment

The application is deployed at [dev.mvuvi.co.ke](https://dev.mvuvi.co.ke)

### Deployment Configuration
- Frontend is built with Vite and served statically
- Backend API runs on Go with Gin framework
- Automated deployment using GitHub Actions and FTP
- Environment variables needed:
  ```
  REACT_APP_GITHUB_TOKEN=your_github_token
  PORT=8080 (backend)
  ```

## 🏃‍♂️ Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run backend server
npm run backend

# Run both frontend and backend
npm run dev:all
```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)