# Quick Start Guide

Follow these steps to run the chat application:

## Step 1: Start MongoDB

Make sure MongoDB is installed and running on your system.

**Windows:**

```bash
net start MongoDB
```

**Mac/Linux:**

```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

## Step 2: Start Backend Server

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see:

- "Server running on port 5000"
- "MongoDB connected successfully"

## Step 3: Start Frontend App

Open a **NEW** terminal and run:

```bash
cd frontend
npm run dev
```

You should see:

- "Local: http://localhost:5173/"

## Step 4: Test the Application

1. Open your browser and go to http://localhost:5173
2. Click "Register here" and create a new account
3. After registration, you'll be logged in automatically

## Step 5: Test Chat with Multiple Users

To test the chat functionality:

1. Open a second browser (or incognito/private window)
2. Go to http://localhost:5173
3. Register another user
4. Now you can chat between the two users!

**In User 1's window:**

- You'll see User 2 in the user list
- Click on User 2 to open chat
- Type a message and click Send

**In User 2's window:**

- You'll see User 1 in the user list
- Click on User 1 to open chat
- You should see the message from User 1 appear in real-time!
- Reply back to test two-way communication

## Features to Test

✅ User Registration
✅ User Login
✅ View all users
✅ Select a user to chat
✅ Send messages
✅ Receive messages in real-time
✅ Message timestamps
✅ Logout

## Troubleshooting

**Problem: "MongoDB connection error"**

- Solution: Make sure MongoDB is running

**Problem: "Port 5000 already in use"**

- Solution: Stop any other application using port 5000 or change the PORT in backend/.env

**Problem: "CORS error"**

- Solution: Make sure both frontend (5173) and backend (5000) are running

**Problem: Messages not appearing in real-time**

- Solution: Check that Socket.io is connected (check browser console)

## Project Structure

```
Chat-Application-With-React-MongoDB/
├── backend/
│   ├── config/db.js           # MongoDB connection
│   ├── models/                # User and Message models
│   ├── routes/                # API routes
│   ├── middleware/            # Authentication
│   ├── server.js              # Main server + Socket.io
│   └── .env                   # Configuration
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx      # Login component
    │   │   ├── Register.jsx   # Register component
    │   │   ├── Chat.jsx       # Main chat container
    │   │   ├── UserList.jsx   # List of users
    │   │   └── ChatWindow.jsx # Chat messages and input
    │   └── App.jsx            # Main app
    └── vite.config.js
```

## Next Steps

- Try creating more users and testing multiple conversations
- Check the code to understand how Socket.io works
- Modify the styles to personalize the app
- Add more features like typing indicators or read receipts

Enjoy chatting! 🎉
