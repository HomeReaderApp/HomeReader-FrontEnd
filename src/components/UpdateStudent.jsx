import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils/DecodeTokens';

export default function UpdateStudentForm(props) {
  const { studentID } = useParams();
  const { classID } = useParams(); // Get the studentID and classID from the URL parameter
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          setError('Authorization token not found');
          return;
        }

        const response = await fetch(`http://localhost:3001/get-student/${studentID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const data = await response.json();
        // Set the student data in the state to pre-fill the form
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setYearLevel(data.yearLevel);
        setLoginCode(data.loginCode);
      } catch (error) {
        setError('Error fetching student data');
      }
    };

    fetchStudentData();
  }, [studentID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3001/update-student/${studentID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          yearLevel,
          loginCode
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json(); // Parse the error response from the server
        throw new Error(errorMessage.message || 'Failed to update student');
      }

      // Handle successful student update here (e.g., show success message, reset form fields, etc.)
      console.log('Student updated successfully');
      navigate(`/teacher/classlist/${classID}/student-list`);
    } catch (error) {
      console.error('Error updating student:', error);
      setError(error.message || 'Failed to update student');
    }
  };

  return (
    <div>
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Year Level:</label>
          <input type="text" name="yearLevel" value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} />
        </div>
        <div>
          <label>Login Code:</label>
          <input type="text" name="loginCode" value={loginCode} onChange={(e) => setLoginCode(e.target.value)} />
        </div>
        <button type="submit">Update Student</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
