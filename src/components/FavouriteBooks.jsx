import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuthToken } from '../utils/DecodeTokens';
import useApiUrl from '../utils/API';

export default function FavouriteBooksList(){
  const { classId } = useParams()
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const ApiUrl = useApiUrl()

  useEffect(() => {
    // Function to fetch favourite books with a rating of 5 from the backend
    const fetchFavouriteBooks = async () => {
      try {
        const token = getAuthToken()
        const response = await fetch(`${ApiUrl}/favourite-books/${classId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFavouriteBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchFavouriteBooks();
  }, [classId]);

  return (
    <div>
      {loading ? (
        <p>Loading favourite books...</p>
      ) : (
        <div>
          {favouriteBooks.length === 0 ? (
            <p>No favourite books found for this class.</p>
          ) : (
            <div>
              <h2>Favourite Books</h2>
              <ul>
                {favouriteBooks.map((book, index) => (
                  <li key={index}>
                    <p>{book.bookName}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
