import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import "./Chat.css";

function Chat({ user, onLogout }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        // Emit user online event
        newSocket.emit("user-online", user.id);

        // Clean up on unmount
        return () => {
            newSocket.disconnect();
        };
    }, [user.id]);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    "http://localhost:5000/api/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch messages when a user is selected
    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                        `http://localhost:5000/api/messages/${selectedUser._id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );
                    const data = await response.json();
                    setMessages(data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };

            fetchMessages();
        }
    }, [selectedUser]);

    // Listen for incoming messages
    useEffect(() => {
        if (socket) {
            socket.on("receive-message", (message) => {
                // Normalize IDs to strings to avoid mismatches between ObjectId and string
                const msgSenderId = message.senderId
                    ? (message.senderId._id ?? message.senderId).toString()
                    : "";
                const msgReceiverId = message.receiverId
                    ? (message.receiverId._id ?? message.receiverId).toString()
                    : "";
                const selectedId = selectedUser
                    ? selectedUser._id.toString()
                    : "";

                // If the incoming message belongs to the currently open conversation, append it
                if (
                    selectedUser &&
                    (msgSenderId === selectedId || msgReceiverId === selectedId)
                ) {
                    setMessages((prevMessages) => [...prevMessages, message]);
                }
            });
        }

        return () => {
            if (socket) {
                socket.off("receive-message");
            }
        };
    }, [socket, selectedUser]);

    const handleSendMessage = async (messageText) => {
        if (!messageText.trim() || !selectedUser) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                "http://localhost:5000/api/messages/send",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        receiverId: selectedUser._id,
                        message: messageText,
                    }),
                },
            );

            const data = await response.json();

            if (response.ok) {
                const newMessage = data.data;
                setMessages((prevMessages) => [...prevMessages, newMessage]);

                // Emit socket event
                if (socket) {
                    socket.emit("send-message", {
                        ...newMessage,
                        receiverId: selectedUser._id,
                    });
                }
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleLogout = () => {
        if (socket) {
            socket.disconnect();
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        onLogout();
    };

    return (
        <div className="chat-container">
            <div className="chat-sidebar">
                <div className="sidebar-header">
                    <h3>{user.username}</h3>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
                <UserList
                    users={users}
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                />
            </div>
            <div className="chat-main">
                {selectedUser ? (
                    <ChatWindow
                        selectedUser={selectedUser}
                        messages={messages}
                        currentUserId={user.id}
                        onSendMessage={handleSendMessage}
                    />
                ) : (
                    <div className="no-chat-selected">
                        <h2>Select a user to start chatting</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;
