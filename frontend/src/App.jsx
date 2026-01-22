import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";

function App() {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleRegister = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    const switchToRegister = () => {
        setShowLogin(false);
    };

    const switchToLogin = () => {
        setShowLogin(true);
    };

    // If user is logged in, show chat
    if (user) {
        return <Chat user={user} onLogout={handleLogout} />;
    }

    // Otherwise show login or register
    return showLogin ? (
        <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
    ) : (
        <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
    );
}

export default App;
