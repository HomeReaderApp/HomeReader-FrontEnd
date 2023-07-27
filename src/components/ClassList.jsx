import React, { useEffect, useState } from 'react';
import { decodeTeacherToken, getAuthToken } from '../utils/DecodeTokens';
import CreateClassForm from './CreateClass';
import { Link } from 'react-router-dom';

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
    const token = getAuthToken()
      const response = await fetch(`http://localhost:3001/${user_id}/get-classes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})

      if (!response.ok) {
        throw new Error('Failed to fetch teacher classes');
      }
      const data = await response.json();
      setClasses(data);
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



