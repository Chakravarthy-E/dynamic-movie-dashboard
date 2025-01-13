# Dynamic Movie Dashboard

A React and TypeScript-based application that uses Zustand for state management to handle user authentication and movie storage. Each user can manage their own movie collection and cast details dynamically.

## Features

### Authentication
- User registration with dynamic fields (`name`, `email`, `password`).
- Login functionality with user validation.
- Secure token-based authentication (mocked for this demo).
- Persistent user state using `zustand/middleware`.

### Movie Management
- Add movies to a personalized collection for each user.
- Add cast members to specific movies.
- Retrieve movies and cast members dynamically.
- Persistent movie storage tied to the logged-in user.

### Persistent State
- Utilizes local storage to persist authentication and movie data across sessions.

## Tech Stack

- **Frontend**: React, TypeScript
- **State Management**: Zustand with `zustand/middleware` for persistence
- **Styling**: CSS (or Tailwind CSS if applicable)
- **Persistence**: Local Storage
- **Build Tool**: Vite
- **Package Manager**: npm

## Installation

1. Clone the repository:
   ```bash
   https://github.com/Chakravarthy-E/dynamic-movie-dashboard.git
   cd dynamic-movie-dashboard
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser:
   ```bash
   http://localhost:3000
   ```

## Usage
### Register a User
- Open the app and navigate to the Register page.
- Enter your name, email, and password to create an account.
### Login
- Navigate to the Login page.
- Enter the email and password of a registered user.
- Upon successful login, the user's data will persist using local storage.
### Manage Movies
- Add movies to your personalized collection using the movie form.
- Add cast members to any movie by providing details like their name and role.
- View your movies and their associated cast members at any time.

## State Management with Zustand
### Auth Store (authStore.ts)
- Handles user authentication.
- Functions:
- registerUser(email, password, name): Registers a new user.
- login(email, password): Logs in a user and generates a token.
- logout(): Clears user and token data.
### Movie Store (movieStore.ts)
- Manages user-specific movie collections.
Functions:
- addMovie(movie): Adds a movie to the user's collection.
- addCastMember(movieId, cast): Adds a cast member to a specific movie.
- getMovie(id): Retrieves a movie by ID.
- getCastMembers(movieId): Fetches the cast of a specific movie.
