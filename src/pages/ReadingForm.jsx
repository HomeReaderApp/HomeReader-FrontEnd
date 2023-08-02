import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeAuthToken } from '../utils/DecodeTokens';
import { SubmitReadingForm } from '../services/ReadingDataServices';

export default function ReadingForm() {
  const navigate = useNavigate();
  const [bookName, setBookName] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [studentID, setStudentID] = useState('')

  useEffect(() => {
    // When the component mounts, try to retrieve the token from localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decodedToken = decodeAuthToken(token);
        setFirstName(decodedToken.firstName);
        setStudentID(decodedToken.studentID);
      } catch (error) {
        console.error('Error decoding the token:', error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await SubmitReadingForm(studentID, bookName, rating, comments);

      if (success) {
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
      <h1>Welcome {firstName}</h1>
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

