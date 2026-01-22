const express = require("express");
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Send message
router.post("/send", authMiddleware, async (req, res) => {
    try {
        const { receiverId, message } = req.body;

        const newMessage = new Message({
            senderId: req.userId,
            receiverId,
            message,
        });

        await newMessage.save();

        res.status(201).json({
            message: "Message sent",
            data: newMessage,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get messages between two users
router.get("/:userId", authMiddleware, async (req, res) => {
    try {
        const otherUserId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { senderId: req.userId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: req.userId },
            ],
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
