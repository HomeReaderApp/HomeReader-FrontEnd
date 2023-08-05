import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { saveAuthToken, decodeTeacherToken } from "../utils/DecodeTokens";
// import "../styles/ReadingForm.css";
import "../styles/TeacherLogin.css";

export default function TeacherLogin(props) {
    const api = process.env.REACT_APP_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log(username)
            const response = await fetch(`${api}/teacher/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    // Save the token to localStorage 
                    saveAuthToken(data.token)
                    const decoded = decodeTeacherToken(data.token)

                    navigate(`/teacher/${decoded.user_id}/portal`)
                }
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to login');
        }
    };

    return (
        <div className="body">
        <div className="relaxing-container"> 
            <h1>Teacher Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <p>New user, register <NavLink to="/teacher/register" className="nav-link">here</NavLink></p> {/* Apply the nav-link class */}
            {error && <p className="error-message">{error}</p>} {/* Apply the error-message class */}
            <button className="login-button" onClick={handleLogin}>Login</button> {/* Apply the login-button class */}
        </div>
        </div>
    )
}
