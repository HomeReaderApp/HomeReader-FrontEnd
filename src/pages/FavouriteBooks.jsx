import React, { useEffect, useState } from 'react';
import { decodeTeacherToken, getAuthToken } from '../utils/DecodeTokens';
import { useNavigate } from 'react-router-dom';
import { FetchTeacherClasses } from '../services/TeacherServices';
import Header from '../components/Header';
import '../styles/Classes.css'

export default function FavouriteBooksDropdown() {
  const [classes, setClasses] = useState([]);
  const [user_id, setUser_id] = useState(null);
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
      // setUsername(decoded.username);
    } catch (error) {
      setError('Error decoding the JWT token');
    }
  }, []);

  useEffect(() => {
    if (user_id) {
        fetchClasses();
    }
    // eslint-disable-next-line
}, [user_id]);

const fetchClasses = async () => {
    const data = await FetchTeacherClasses(user_id);
    if (data) {
        setClasses(data);
    } else {
        setError('Error fetching teacher classes');
    }
};

  const navigate = useNavigate();

  const handleClassChange = (event) => {
    const selectedClassId = event.target.value;
    setSelectedClass(selectedClassId);

    // Navigate to the class comments page when a class is selected
    navigate(`/teacher/${selectedClassId}/favourite-books`);
  
  };

  return (
    <div>
      <Header />
      <div className='portal-container'>
      <div className='teacher-portal'>
      <h1>Teacher Classes</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {/* <label htmlFor="class-dropdown"></label> */}
          <select id="class-dropdown" className="nice-dropdown" value={selectedClass} onChange={handleClassChange}>
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
    </div>
    </div>
  );
}

