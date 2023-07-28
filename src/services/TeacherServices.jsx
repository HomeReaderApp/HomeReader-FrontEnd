import useApiUrl from '../utils/API';
import { getAuthToken } from '../utils/DecodeTokens';

export const FetchTeacherClasses = async (user_id) => {
    try {
        const Api = useApiUrl()
        const token = getAuthToken();
        const response = await fetch(`${Api}/${user_id}/get-classes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch teacher classes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching teacher classes:', error);
        return null;
    }
};

// Register teacher user
export const RegisterTeacher = async (userData) => {
    try {
      const Api = useApiUrl()
      const response = await fetch(`${Api}/teacher/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      return data.token;
    } catch (error) {
      throw error;
    }
  };
  
