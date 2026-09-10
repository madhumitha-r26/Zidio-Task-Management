# 📝 Zidio Task Management System

A full-stack **Task Management System** that allows users to securely register and log in to their accounts and manage their personal tasks from an interactive dashboard.

Users can **create, view, edit, complete, and delete tasks**, while also setting important task details such as **due dates and priority levels**. The application also provides a **Light/Dark theme option** for a personalized dashboard experience.

---

## ✨ Features

### 🔐 User Authentication

* User registration and login
* Secure password hashing using **bcrypt**
* Authentication using **JSON Web Tokens (JWT)**
* Protected user-specific task management
* Cookie-based authentication support

### 📋 Task Management

* Add new tasks
* View existing tasks
* Edit task details
* Mark tasks as completed
* Delete tasks
* Set task due dates
* Assign task priority levels

### 🎨 Dashboard

* Clean and responsive dashboard
* Task overview and management
* Light Mode and Dark Mode
* Responsive interface for different screen sizes

### 🔒 Backend & API

* RESTful API built using **Express.js**
* MongoDB database integration using **Mongoose**
* CORS configuration for frontend-backend communication
* Environment variable support using **dotenv**
* Error handling for API requests
* Authentication and authorization for protected resources

### ☁️ Deployment

* Frontend and backend can be deployed as separate applications
* Backend configured for **Vercel**
* Backend dependencies managed through `package.json` and `package-lock.json`

---

## 🛠️ Tech Stack Used

### ✨ Frontend

* ReactJS
* Tailwind CSS
* JavaScript
* Vite

### ⚙️ Backend

* Node.js
* Express.js
* JWT
* bcrypt
* Cookie Parser
* CORS
* dotenv
* Axios

### 🗄️ Database

* MongoDB
* Mongoose

### ☁️ Hosting & Deployment

* Vercel
* GitHub

---

## 📁 Project Structure

```text
Zidio-Task-Management/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/madhumitha-r26/Zidio-Task-Management.git
```

Navigate into the project:

```bash
cd Zidio-Task-Management
```

---

## ⚙️ Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm start
```

For development with Nodemon:

```bash
npm run dev
```

The backend will run locally on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

The backend uses environment variables to keep sensitive configuration outside the source code.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

> ⚠️ Do not commit the `.env` file to GitHub.

---

## 🔄 Application Workflow

```text
             ┌─────────────────┐
             │      User       │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ React Frontend  │
             │  + Tailwind CSS │
             └────────┬────────┘
                      │
                  REST API
                      │
                      ▼
             ┌─────────────────┐
             │ Express Backend │
             │    Node.js      │
             └───────┬─────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
   JWT Authentication      Task Operations
          │                     │
          └──────────┬──────────┘
                     ▼
             ┌─────────────────┐
             │     MongoDB     │
             │    Mongoose     │
             └─────────────────┘
```

---

## 🔐 Authentication Flow

1. A new user registers through the frontend.
2. The backend validates the registration request.
3. The user's password is securely hashed using **bcrypt**.
4. User information is stored in MongoDB.
5. During login, the backend verifies the user's credentials.
6. A **JWT token** is generated after successful authentication.
7. The authenticated user can access protected task-management functionality.
8. Users can manage only the tasks associated with their account.

---

## 📋 Task Management Flow

After logging in, users can manage their tasks through the dashboard.

A task can contain information such as:

* Task title
* Task description
* Due date
* Priority
* Completion status

Users can:

```text
Create Task
    ↓
View Task
    ↓
Edit Task ──────┐
    ↓           │
Complete Task   │
    ↓           │
Delete Task ◄───┘
```

---

## 🎨 Theme Support

The dashboard supports two visual modes:

* ☀️ Light Mode
* 🌙 Dark Mode

Users can switch between themes according to their preference, providing a more comfortable dashboard experience.

---

## ☁️ Vercel Deployment

The backend is configured for deployment on **Vercel**.

The backend contains a `vercel.json` configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

When deploying the backend as a separate Vercel project, set the **Root Directory** to:

```text
server
```

This allows Vercel to correctly locate:

```text
server/index.js
server/package.json
server/package-lock.json
server/vercel.json
```

Environment variables such as `MONGO_URI` and `JWT_SECRET` should be configured in the Vercel project settings.

---

## 📌 Future Enhancements

Possible improvements for future versions include:

* 🔔 Task reminder notifications
* 📅 Calendar-based task management
* 🔍 Task search and filtering
* 📊 Task completion analytics
* 👥 Collaborative task management
* 📱 Progressive Web App support
* 🔄 Real-time task updates
* 📧 Email notifications
* 🏷️ Task categories and labels

---

## 👩‍💻 Author

**Madhumitha R**

---

## ⭐ Acknowledgement

This project was developed as a full-stack task management application to demonstrate the practical implementation of **React, Node.js, Express.js, MongoDB, authentication, REST APIs, and cloud deployment**.
