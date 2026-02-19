# EJS Notes App

A server-rendered notes application built with Node.js, Express, EJS, and MongoDB.

Live Demo: https://ejs-notes-app.onrender.com

## Overview

This project demonstrates:
- Server-side rendering with EJS
- User authentication using sessions
- MongoDB integration with Mongoose
- RESTful routing structure
- Production deployment on Render

## Features

- User registration and login
- Create, edit, and delete notes
- Persistent storage with MongoDB
- Session-based authentication

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- EJS
- express-session

## Running Locally

1. Clone the repository
2. Install dependencies

```bash
npm install
````

3. Create a `.env` file:

```
MONGODB_URI=your_mongo_uri
SESSION_SECRET=your_secret
```

4. Start the server:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)
