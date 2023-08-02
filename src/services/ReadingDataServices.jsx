import { getAuthToken } from '../utils/DecodeTokens';

export const FetchComments = async (classId) => {
    try {
        const api = process.env.REACT_APP_BACKEND_URL
        const token = getAuthToken();
        const response = await fetch(`${api}/comments/${classId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return null;
    }
};

export const SubmitReadingForm = async (studentID, bookName, rating, comments) => {
  try {
    const api = process.env.REACT_APP_BACKEND_URL
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token not found. Please log in.');
    }

    const response = await fetch(`${api}/${studentID}/submit-reading-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookName,
        rating,
        comments,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('Failed to submit reading form.');
    }
  } catch (error) {
    console.error('Error submitting reading form:', error);
    throw error;
  }
};

export const fetchFavouriteBooks = async (classId) => {
  try {
    const api = process.env.REACT_APP_BACKEND_URL
    const token = getAuthToken();
    const response = await fetch(`${api}/favourite-books/${classId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching favourite books:', error);
    return null;
  }
};


