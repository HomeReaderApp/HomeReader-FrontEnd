
// Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 
import LogoutButton from './TeacherLogoutButton';
import { decodeTeacherToken, getAuthToken } from '../utils/DecodeTokens';

export default function Header(){
  const [user_id, setUser_id] = useState(null)
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getAuthToken()
    
    if (!token) {
      // Handle the case when the token is not available
      setError('JWT token not found in local storage');
      return;
    }
  
    try {
      const decoded = decodeTeacherToken(token)
      setUser_id(decoded.user_id);
    } catch (error) {
      setError('Error decoding the JWT token');
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
      <Link to={`/teacher/${user_id}/portal`}>
        <img src={require('../styles/logo.svg').default} alt="Logo" />
      </Link>
      </div>
      <nav className="navbar">
        <Link to="/teacher/classes">
          <button>Teacher classes</button>
        </Link>

        <Link to="/teacher/class-dropdown">
          <button>Comments</button>
        </Link>

        <Link to="/teacher/favourite-books">
          <button>Favourite books</button>
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
};
