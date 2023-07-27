import React, { useState } from 'react';
import { getAuthToken, decodeTeacherToken } from '../utils/DecodeTokens'

export default function CreateClassForm() {
  const [className, setClassName] = useState('');
//   const [teacherId, setTeacherId] = useState('')
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setClassName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = getAuthToken(); // Get the authentication token from local storage
    //   const decoded = decodeTeacherToken(token)
    //   setTeacherId(decoded.user_id)

      const response = await fetch('http://localhost:3001/create-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          className,
        }),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error('Failed to create class');
      }

      // Handle successful class creation
      setSuccess(true); // Set success status to true
      setClassName('');
      setTimeout(() => {
        window.location.reload(); // Refresh the page after a short delay
      }, 2000); 
    } catch (error) {
      console.error('Error creating class:', error);
      setError('Failed to create class');
    }
  };

  return (
    <div>
      <h1>Create Class</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name:</label>
          <input type="text" value={className} onChange={handleChange} />
        </div>
        <button type="submit">Create Class</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Class created successfully!</p>}
    </div>
  );
};