import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { saveAuthToken, decodeTeacherToken } from "../utils/DecodeTokens";


export default function TeacherLogin(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let NavLinkStyle = {
        textDecorationColor: "blue",
        textDecorationLine: "underline"
    }

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log(username)
          const response = await fetch('http://localhost:3001/teacher/login', {
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
        
    return(
        <div>
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
            <p>New user, register <NavLink to="/teacher/register" style={NavLinkStyle}>here</NavLink></p>
            {error && <p>{error}</p>}
            <button onClick={handleLogin}>Login</button>

        </div>
    )
}