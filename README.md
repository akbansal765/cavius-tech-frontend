# Project Demo

DEMO VIDEO LINK: https://drive.google.com/file/d/1JuYCkhQ4qwFipMDLHAtWQonyJaiKM50O/view?usp=sharing

GitHub Backend REPO: https://github.com/akbansal765/cavius-tech-backend
GitHub Frontend REPO: https://github.com/akbansal765/cavius-tech-frontend

# Project Setup Instructions

Follow the steps below to get the project running locally.

## Setup Instructions

### Step 1: Start the Frontend

cd frontend
npm install
npm run dev

### Step 2: Start the Backend

cd backend
npm install
npm start


### Authentication Flow

Register: Users must first create an account by registering.

Login: After registering, users can log in to access the application.

Access Control: Only logged-in users (authenticated via JWT) are allowed to upload invoices.

Security: User passwords are hashed using bcrypt before storing them in the database.


### Features
User registration and login system

Authenticated users can upload invoices

JWT (JSON Web Token) is used to protect routes and verify users

Passwords are securely hashed using bcrypt

Clean separation of frontend and backend codebases


## 🧰 Tech Stack

### 🌐 Frontend  
- React.js (with Hooks and functional components)  
- Redux Toolkit (for state management)  
- React Router DOM   
- Day.js (for date formatting)
- UUID (for generating unique task IDs)  

### 🛠️ Backend  
- Node.js with Express  
- MongoDB with Mongoose  
- JWT (for authentication)  
- Bcrypt (password hashing)  
- CORS
- Dotenv (environment variables handling)   


## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### 🔐 Auth Routes

| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| POST   | `/register`    | Create new user    |
| POST   | `/login`       | Authenticate user  |

### 📋 Task Routes (JWT Protected)

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | `/tasks`       | Fetch all user tasks   |
| POST   | `/tasks`       | Create a new task      |
| PUT    | `/tasks/:id`   | Update a task          |
| DELETE | `/tasks/:id`   | Delete a task          |