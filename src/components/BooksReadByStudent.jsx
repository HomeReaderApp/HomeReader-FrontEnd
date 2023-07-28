import React, { useState, useEffect } from 'react';
import { getAuthToken } from '../utils/DecodeTokens';
import { useParams } from 'react-router-dom';

export default function BooksReadByStudent() {
    const {studentID} = useParams()
  const [booksRead, setBooksRead] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooksReadByStudent = async () => {
      try {
        const token = getAuthToken()
        const response = await fetch(`http://localhost:3001/${studentID}/books`, {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books read by the student.');
        }

        const data = await response.json();
        setBooksRead(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to get books read by the student.');
        setLoading(false);
      }
    };

    fetchBooksReadByStudent();
  }, [studentID]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Books Read by Student</h2>
      {booksRead.length > 0 ? (
        <ul>
          {booksRead.map((book) => (
            <li key={book._id}>
              <p>Book Name: {book.bookName}</p>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No books read by the student yet.</p>
      )}
    </div>
  );
}
