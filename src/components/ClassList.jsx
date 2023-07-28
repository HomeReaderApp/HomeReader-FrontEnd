import React, { useEffect, useState } from 'react';
import { decodeTeacherToken, getAuthToken } from '../utils/DecodeTokens';
import CreateClassForm from './CreateClass';
import { Link } from 'react-router-dom';
import { FetchTeacherClasses } from '../services/TeacherServices';

export default function TeacherClasses() {
  const [classes, setClasses] = useState([]);
  const [user_id, setUser_id] = useState(null);
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null);

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
      setUsername(decoded.username)
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

  return (
    <div>
      <h1>Teacher Classes</h1>
      {user_id && (
        <p>Welcome, {username}</p>
      )}
      <CreateClassForm />
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {classes.map((teacherClass) => (
            <li key={teacherClass._id}>
            <Link to={`/teacher/classlist/${teacherClass._id}/student-list`}>{teacherClass.className}</Link>
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};



