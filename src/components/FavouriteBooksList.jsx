import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { fetchFavouriteBooks  } from '../services/ReadingDataServices';

export default function FavouriteBooksList(){
  const { classId } = useParams()
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Function to fetch favourite books with a rating of 5 from the backend
    const fetchData = async () => {
      try {
        const books = await fetchFavouriteBooks(classId);
        setFavouriteBooks(books || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favourite books:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [classId]);

  return (
    <div>
      <Header />
      <div className='portal-container'>
      <div className='teacher-portal'>
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
    </div>
    </div>
  );
}
