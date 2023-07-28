

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchComments } from '../services/ReadingDataServices';

export default function Comments() {
  const { classId } = useParams();
  console.log(classId)
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const data = await FetchComments(classId);
        if (data) {
            setComments(data);
        } else {
            setComments([]);
        }
        setLoading(false);
    };

    fetchData();
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


