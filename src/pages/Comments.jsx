

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils/DecodeTokens';

export default function Comments() {
  const { classId } = useParams();
  console.log(classId)
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch comments from the backend
    const fetchComments = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`http://localhost:3001/comments/${classId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
              },
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [classId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format the date according to the user's locale
  };

  const handleGoBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <div>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          {comments.length === 0 ? (
            <p>No comments found for this class.</p>
          ) : (
            <div>
              <h2>Comments for Class</h2>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <strong>{comment.studentName}</strong> commented on{' '}
                    <strong>{comment.bookName}</strong>:
                    <blockquote>{comment.comment}</blockquote>
                    <p>Date: {formatDate(comment.date)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}


