
import { getAuthToken } from '../utils/DecodeTokens';
const api = process.env.REACT_APP_BACKEND_URL;

export const FetchTeacherClasses = async (user_id) => {
    try {
      console.log(api)
        const token = getAuthToken();
        const response = await fetch(`${api}/${user_id}/get-classes`, {
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
  console.log(api)
  try {
    const response = await fetch(`${api}/teacher/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data.token;
  } catch (error) {
    throw error;
  }
};

  
