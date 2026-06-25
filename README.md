# Node Course

A learning project built while following the **Node.js backend course from [freeCodeCamp.org](https://www.freecodecamp.org/)**.

The focus of this repo is the **backend** — a small Express + MongoDB API for users and posts. The **frontend** is a minimal Angular app created purely to exercise and test the backend endpoints from a browser; it is not the focus of the course.

## Project structure

```
node-course/
├── backend/    # Express + Mongoose API (TypeScript)
└── frontend/   # Angular app for testing the API
```

## Backend

Express 5 + Mongoose, written in TypeScript. Exposes:

- `POST   /api/v1/users/`      — register a user
- `POST   /api/v1/users/login` — log in
- `POST   /api/v1/users/logout`— log out
- `GET    /api/v1/posts/`      — list posts
- `POST   /api/v1/posts/`      — create a post
- `GET    /api/v1/posts/:id`   — get a post
- `PUT    /api/v1/posts/:id`   — update a post
- `DELETE /api/v1/posts/:id`   — delete a post

### Frontend

Angular (standalone components) with two areas:

- **Register** — form to create a new user.
- **Posts** — list, edit, and delete posts.

It talks to the backend through a dev proxy, so API calls go to the same origin during development.

## Running the project

The backend and frontend run as two separate processes. Start the backend first.

### Prerequisites

- Node.js 24 (the frontend pins this via `frontend/.nvmrc`)
- A MongoDB connection string (e.g. MongoDB Atlas)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
PORT=4000
MONGODB_URI=<your-mongodb-connection-string>
```

Then start it in watch mode:

```bash
npm run dev
```

The API runs on http://localhost:4000.

### 2. Frontend

In a second terminal:

```bash
cd frontend
nvm use        # selects Node 24 from .nvmrc
npm install
npm start
```

The app runs on http://localhost:4200 and proxies `/api` requests to the backend on port 4000, so make sure the backend is running.
