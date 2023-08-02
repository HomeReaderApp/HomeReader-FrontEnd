
import { getAuthToken } from '../utils/DecodeTokens';

export const FetchStudentData = async (studentID) => {
    const api = process.env.REACT_APP_BACKEND_URL
    const token = getAuthToken();
    try {
        const response = await fetch(`${api}/get-student/${studentID}`, {
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
        console.error('Error fetching student data:', error);
        return null;
    }
};

export const UpdateStudentData = async (studentID, studentData) => {
  try {
    const api = process.env.REACT_APP_BACKEND_URL
    const token = getAuthToken();
    const response = await fetch(`${api}/update-student/${studentID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorMessage = await response.json(); // Parse the error response from the server
      throw new Error(errorMessage.message || 'Failed to update student');
    }

    const data = await response.json();
    return data; // Return any data received from the response if needed
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Function to create a new student
export const CreateStudent = async (classID, studentData) => {
  try {
    const api = process.env.REACT_APP_BACKEND_URL
    const token = getAuthToken();
    const response = await fetch(`${api}/${classID}/add-student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400 && errorData.error) {
        throw new Error(errorData.error);
      } else {
        throw new Error('Failed to create student');
      }
    }

    return true; // Return true to indicate successful student creation
  } catch (error) {
    throw error;
  }
};


export const deleteStudent = async (studentID) => {
  try {
    const api = process.env.REACT_APP_BACKEND_URL
    const token = getAuthToken();
    const response = await fetch(`${api}/delete-student/${studentID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete student');
    }

    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

