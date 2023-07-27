import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {saveAuthToken, decodeAuthToken} from '../utils/DecodeTokens'

export default function StudentLogin() {
  const [studentLoginCode, setStudentLoginCode] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginCode: studentLoginCode,
          lastName: studentLastName,
        }),
      });
      

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      const { firstName, lastName, token } = data;

      // Save token to local storage and then decode token to get studentID
      saveAuthToken(token)
      const decoded = decodeAuthToken(token)

      // Redirect to another page using user_id as param
      navigate(`/student/${decoded.user_id}/reading-form`); 

    } catch (error) {
      alert('Authentication failed. Please check your login code and last name.');
    }
  };

  return (
    <div>
      <h1>Student Login</h1>
      <form onSubmit={handleLogin}>
        <label>Login Code:</label>
        <input
          type="text"
          name="loginCode"
          value={studentLoginCode}
          onChange={(event) => setStudentLoginCode(event.target.value)}
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={studentLastName}
          onChange={(event) => setStudentLastName(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
