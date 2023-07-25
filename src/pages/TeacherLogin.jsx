import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function TeacherLogin(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await fetch('/mongodb://localhost:27017/home_reader_db/teacher/login', {
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
              
              localStorage.setItem('token', data.token);
    
              navigate('/teacher/portal')
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
            {error && <p>{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}