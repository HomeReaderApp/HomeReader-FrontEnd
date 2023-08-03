import { getAuthToken } from '../utils/DecodeTokens';



// Function to fetch teacher class details
export const FetchTeacherClass = async (classID, user_id) => {
  try {
    const api = process.env.REACT_APP_BACKEND_URL;
    const token = getAuthToken();

    let url = `${api}/get-class/${classID}`;
    if (user_id) {
      // Append user_id to the URL if provided
      url += `?user_id=${user_id}`;
    }

    const response = await fetch(url, {
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



