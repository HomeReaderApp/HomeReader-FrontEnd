import { getAuthToken } from '../utils/DecodeTokens';
import useApiUrl from '../utils/API';

// Function to fetch teacher class details
export const FetchTeacherClass = async (classID) => {
  try {
    const apiUrl = useApiUrl(); 
    const token = getAuthToken();
    const response = await fetch(`${apiUrl}/get-class/${classID}`, {
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


