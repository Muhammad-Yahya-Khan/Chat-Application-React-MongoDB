# Chat Application

A simple 1-to-1 chat application similar to WhatsApp, built with React, Node.js, and MongoDB.

## Features

- User Registration and Login
- 1-to-1 Real-time Messaging
- Online/Offline Status
- Simple and Beginner-Friendly Code
- Uses only useState and useEffect hooks

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io

## Project Structure

```
Chat-Application-With-React-MongoDB/
├── backend/              # Node.js backend
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Main server file
│   └── package.json
└── frontend/            # React frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── App.jsx      # Main App component
    │   └── main.jsx
    └── package.json
```

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running locally)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Make sure MongoDB is running on your system:

    ```bash
    # On Windows, MongoDB usually runs as a service
    # You can start it from Services or run:
    net start MongoDB
    ```

4. The `.env` file is already configured with default settings:
    - PORT: 5000
    - MONGODB_URI: mongodb://localhost:27017/chatapp
    - JWT_SECRET: (change this in production)

5. Start the backend server:

    ```bash
    npm run dev
    ```

    The server will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

    The app will run on http://localhost:5173

## Usage

1. Open your browser and go to http://localhost:5173
2. Register a new account with username, email, and password
3. Open another browser (or incognito window) and register another user
4. Select a user from the list to start chatting
5. Messages will appear in real-time!

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users` - Get all users (requires authentication)
- `GET /api/users/:id` - Get user by ID (requires authentication)

### Messages

- `POST /api/messages/send` - Send a message (requires authentication)
- `GET /api/messages/:userId` - Get messages with a specific user (requires authentication)

## Socket.io Events

- `user-online` - User connects and comes online
- `send-message` - Send a message to another user
- `receive-message` - Receive a message from another user
- `user-status` - Get user online/offline status
- `disconnect` - User disconnects

## Code Simplicity

This project is designed for beginners:

- Only uses `useState` and `useEffect` hooks in React
- Simple, readable code with comments
- No complex state management libraries
- Straightforward API structure
- Clear component organization

## Notes

- Make sure MongoDB is running before starting the backend
- The JWT_SECRET in `.env` should be changed for production use
- For production deployment, update CORS settings and environment variables

## Troubleshooting

**MongoDB Connection Error**: Make sure MongoDB is installed and running on your system.

**Port Already in Use**: If port 5000 or 5173 is already in use, you can change them:

- Backend: Update PORT in `.env` file
- Frontend: Update port in `vite.config.js`

**CORS Errors**: Make sure both frontend and backend are running on the specified ports.

## License

This project is open source and available under the MIT License.
