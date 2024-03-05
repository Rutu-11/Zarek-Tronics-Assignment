# Schroedinger's Signup Backend

## Overview
Schroedinger's Signup Backend serves as the brain behind the registration system, handling data storage, authentication, and communication with the frontend. It utilizes Node.js and MongoDB for efficient data management.

## Functionalities
- **User Authentication**: Handles user registration and login securely.
- **Data Storage**: Stores user information in MongoDB.
- **WebSocket Communication**: Integrates Socket.IO for real-time communication with the frontend.
- **Cross-Origin Resource Sharing (CORS)**: Allows secure communication between frontend and backend.

## Tech Stack
- **Framework**: Express
- **Database**: MongoDB, Mongoose
- **Security**: Bcrypt, JSON Web Token (JWT)
- **Middleware**: CORS, Dotenv
- **WebSocket Communication**: Socket.IO
- **Development Tools**: Nodemon

## Getting Started
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Set up environment variables by creating a `.env` file and configuring MongoDB connection string and other necessary variables.
5. Run the server using `npm start`.

## Additional Notes
- Make sure MongoDB is running and accessible.
- For development, use `npm run dev` to enable automatic server restarts with Nodemon.

This README provides an overview of both the frontend and backend components of Schroedinger's Signup system, along with instructions for setup and usage.