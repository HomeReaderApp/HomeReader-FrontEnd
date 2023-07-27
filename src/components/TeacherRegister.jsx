import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeTeacherToken, saveAuthToken } from '../utils/DecodeTokens';

export default function RegisterTeacherUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the request body
      const requestBody = {
        firstName,
        lastName,
        schoolName,
        username,
        password,
      };

      // Make the POST request using fetch
      const response = await fetch('http://localhost:3001/teacher/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        // credentials: 'include',
      });

      const data = await response.json();

      // Check if there was an error in the response
      if (!response.ok) {
        throw new Error(data.error);
      }

      // localStorage.setItem('token', data.token);
      saveAuthToken(data.token)
      const decoded = decodeTeacherToken(data.token)

      // If registration is successful, navigate to the teacher portal
      navigate(`/teacher/${decoded.user_id}/portal`);

      console.log('User registered successfully:', data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Teacher Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="School Name"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

