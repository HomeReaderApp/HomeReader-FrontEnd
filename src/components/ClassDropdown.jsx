
import React, { useEffect, useState } from 'react';
import { decodeTeacherToken, getAuthToken } from '../utils/DecodeTokens';
import { useNavigate } from 'react-router-dom';
import { FetchTeacherClasses } from '../services/TeacherServices';

export default function ClassDropdown() {
 

  const [classes, setClasses] = useState([]);
  const [user_id, setUser_id] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null); // Store the selected class

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      // Handle the case when the token is not available
      setError('JWT token not found in local storage');
      return;
    }

    try {
      const decoded = decodeTeacherToken(token);
      setUser_id(decoded.user_id);
      setUsername(decoded.username);
    } catch (error) {
      setError('Error decoding the JWT token');
    }
  }, []);

  useEffect(() => {
    if (user_id) {
      fetchTeacherClasses(user_id);
    }
  }, [user_id]);

  const fetchTeacherClasses = async (user_id) => {
    try {
      const data = await FetchTeacherClasses(user_id); // Use the service function directly
      if (data) {
        setClasses(data);
      } else {
        setError('Error fetching teacher classes');
      }
    } catch (error) {
      setError('Error fetching teacher classes');
    }
  };

  const navigate = useNavigate();

  const handleClassChange = (event) => {
    const selectedClassId = event.target.value;
    setSelectedClass(selectedClassId);

    // Navigate to the class comments page when a class is selected
    navigate(`/teacher/${selectedClassId}/comments`);
  };

  return (
    <div>
      <h1>Teacher Classes</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <label htmlFor="class-dropdown">Select a class:</label>
          <select id="class-dropdown" value={selectedClass} onChange={handleClassChange}>
            <option value="">--Select a class--</option>
            {classes.map((teacherClass) => (
              <option key={teacherClass._id} value={teacherClass._id}>
                {teacherClass.className}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

