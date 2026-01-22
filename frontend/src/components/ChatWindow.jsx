import { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";

function ChatWindow({ selectedUser, messages, currentUserId, onSendMessage }) {
    const [messageText, setMessageText] = useState("");
    const messagesEndRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageText.trim()) {
            onSendMessage(messageText);
            setMessageText("");
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-user-avatar">
                    {selectedUser.username.charAt(0).toUpperCase()}
                </div>
                <div className="chat-user-name">{selectedUser.username}</div>
            </div>

            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.senderId === currentUserId ? "sent" : "received"}`}
                    >
                        <div className="message-content">
                            <div className="message-text">{msg.message}</div>
                            <div className="message-time">
                                {formatTime(msg.createdAt)}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="message-input-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="message-input"
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatWindow;
