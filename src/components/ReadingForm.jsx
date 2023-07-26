import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeAuthToken } from '../utils/DecodeTokens';

export default function ReadingForm() {
  const navigate = useNavigate();
  const [bookName, setBookName] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }

      const decoded = decodeAuthToken(token);
      const studentId = decoded.user_id;

      const response = await fetch(`http://localhost:3001/student/${studentId}/submit-reading-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookName,
          rating,
          comments,
        }),
      });

      if (response.ok) {
        setSubmissionMessage('Successfully submitted');

        // Automatically return to the login screen after 3 seconds
        setTimeout(() => {
          navigate('/student/login');
        }, 3000);
      } else {
        throw new Error('Failed to submit reading form.');
      }
    } catch (error) {
      setSubmissionMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Submit Reading Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
}

