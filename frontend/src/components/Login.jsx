import { useState } from "react";
import "./Login.css";

function Login({ onLogin, onSwitchToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                },
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                onLogin(data.user);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Failed to login. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login to Chat</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="btn-primary">
                        Login
                    </button>
                </form>
                <p className="switch-auth">
                    Don't have an account?{" "}
                    <span onClick={onSwitchToRegister}>Register here</span>
                </p>
            </div>
        </div>
    );
}

export default Login;
