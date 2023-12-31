

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchComments } from '../services/ReadingDataServices';
import Header from './Header';
// import '../styles/Comments.css'

export default function Comments() {
  const { classId } = useParams();
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

  return (
    <div>
      <Header />
      <div className='portal-container'>
      <div className='teacher-portal'>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          {comments.length === 0 ? (
            <p>No comments found for this class.</p>
          ) : (
            <div className='comments-portal'>
              <h2>Comments for Class</h2>
              <ul className='card-container'>
                {comments.map((comment, index) => (
                  <li className='comments-card' key={index}>
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
    </div>
    </div>
    </div>
  );
}


