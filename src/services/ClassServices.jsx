import { getAuthToken } from '../utils/DecodeTokens';

const api = process.env.REACT_APP_BACKEND_URL;

// Function to fetch teacher class details
export const FetchTeacherClass = async (classID) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${api}/get-class/${classID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch teacher class');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


