import React, { useEffect, useState } from 'react';
import { decodeTeacherToken, getAuthToken } from '../utils/DecodeTokens';
import { useNavigate } from 'react-router-dom';
import { FetchTeacherClasses } from '../services/TeacherServices';
import Header from '../components/Header';
import '../styles/Comments.css'

export default function ClassDropdown() {
  const [classes, setClasses] = useState([]);
  const [user_id, setUser_id] = useState(null);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      setError('JWT token not found in local storage');
      return;
    }

    try {
      const decoded = decodeTeacherToken(token);
      setUser_id(decoded.user_id);
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

  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const data = await FetchTeacherClasses(user_id);
      setClasses(data);
    } catch (error) {
      setError('Error fetching teacher classes');
    }
  };

  const handleClassChange = async (event) => {
    const selectedClassId = event.target.value;
    setSelectedClass(selectedClassId);

    try {
      const data = await FetchTeacherClasses(user_id);
      const selectedClassDetails = data.find((teacherClass) => teacherClass._id === selectedClassId);

      // Check if the selected class details are available
      if (selectedClassDetails) {
        navigate(`/teacher/${selectedClassId}/comments`, { state: { classDetails: selectedClassDetails } });
      } else {
        setError('Selected class details not found');
      }
    } catch (error) {
      setError('Error fetching class details');
    }
  };

  return (
    <div>
      <Header />
      <div className='portal-container'>
      <div className="class-portal">
      <div className='comments-container'>
      <h1>Teacher Classes</h1>
      <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
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
    </div>
    </div>
  );
}


