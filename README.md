# Developer Portfolio

Welcome to the Developer Portfolio project! This is a full-stack web application showcasing a developer's skills, projects, blog posts, and contact information. The portfolio is built with modern web technologies, providing a performant and responsive user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design**: Optimized for various devices and screen sizes.
- **Skills Showcase**: Interactive display of technical expertise with animations.
- **Projects Gallery**: Detailed information about past projects with links to code and live demos.
- **Blog Platform**: Full-featured blog with posts, tags, and social sharing.
- **Admin Dashboard**: Protected routes for managing blog posts, projects, and skills.
- **Authentication**: Secure login for admin users.
- **API Integration**: Backend API built with Golang for data retrieval and manipulation.

## Tech Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **React Router**: Client-side routing.
- **React Query**: Data fetching and caching.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icons for React applications.

### Backend

- **Golang**: Backend programming language.
- **Gin**: Web framework for Golang.
- **GORM**: ORM library for Golang.
- **PostgreSQL**: Relational database.
- **JWT**: Authentication via JSON Web Tokens.

### Tools and Libraries

- **Axios**: Promise-based HTTP client.
- **React Hook Form**: Form management.
- **Date-fns**: Date utility library.
- **React Markdown**: Render Markdown content.
- **Zustand**: State management.
- **ESLint**: Linting utility.
- **Vite**: Frontend tooling.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- **Node.js** (version >=14)
- **npm** or **yarn**
- **Golang** (version >=1.16)
- **PostgreSQL** database

### Installation

1. **Clone the repository:**
  ```bash
   git clone https://github.com/arnoldadero/portfolio.git
   cd portfolio
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Set up the backend:**

   Go to the backend directory and download dependencies:

   ```bash
   cd backend
   go mod tidy
   ```

5. **Configure the database:**

   - Create a PostgreSQL database.
   - Update the database connection configuration in `backend/main.go` or your configuration file.

### Running the Application

**Start the Backend Server:**

```bash
cd backend
go run .
```

**Start the Frontend Development Server:**

In a new terminal window, start the frontend:

```bash
npm run dev
# or
yarn dev
```

The application should now be running at `http://localhost:3000`.

## Project Structure

```plaintext
portfolio/
├── backend/            # Golang backend API
│   ├── main.go         # API entry point
│   ├── go.mod          # Go module definitions
│   └── ...             # Other backend files
├── src/                # Frontend source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   ├── index.css       # Global styles
│   └── ...             # Other frontend files
├── public/             # Public assets
├── package.json        # NPM scripts and dependencies
└── README.md           # Project documentation
```

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm run lint`**: Lints the code using ESLint.
- **`npm run preview`**: Previews the production build.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.

2. **Create a new branch**:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make your changes and commit**:

   ```bash
   git commit -m "Add YourFeature"
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/YourFeature
   ```

5. **Submit a pull request**.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to explore the code, open issues, or submit pull requests to improve the project!
```