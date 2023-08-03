import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, clearAuthToken } from '../utils/DecodeTokens';

export default function LogoutButton(){
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const api = process.env.REACT_APP_BACKEND_URL;
      const token = getAuthToken();
      // Make a POST request to the backend to logout the user
      await fetch(`${api}/teacher/logout`, {
        method: 'POST',
        'Authorization': `Bearer ${token}`
      });

      // Clear the authentication token
      clearAuthToken();

      // Navigate to the root route ("/") after successful logout
      navigate('/');

    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

