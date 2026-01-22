const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.io setup
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Store online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // When user joins, store their socket id
    socket.on("user-online", (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit("user-status", { userId, status: "online" });
    });

    // Handle sending messages
    socket.on("send-message", (message) => {
        const receiverSocketId = onlineUsers.get(message.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive-message", message);
        }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        let disconnectedUserId;
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                disconnectedUserId = userId;
                onlineUsers.delete(userId);
                break;
            }
        }
        if (disconnectedUserId) {
            io.emit("user-status", {
                userId: disconnectedUserId,
                status: "offline",
            });
        }
        console.log("User disconnected:", socket.id);
    });
});
