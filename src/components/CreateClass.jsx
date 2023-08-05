import React, { useState } from 'react';
import { getAuthToken } from '../utils/DecodeTokens'


export default function CreateClassForm() {
  const [className, setClassName] = useState('');
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
      const api = process.env.REACT_APP_BACKEND_URL
      const response = await fetch(`${api}/create-class`, {
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
      <form onSubmit={handleSubmit}>
        <div>
          <input className='class-input' type="text" placeholder='Type class name here...' value={className} onChange={handleChange} />
        </div>
        <button className='create-button' type="submit">Create Class</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Class created successfully!</p>}
    </div>
  );
};