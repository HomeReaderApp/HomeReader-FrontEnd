
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAuthToken } from '../utils/DecodeTokens';
import CreateStudentForm from './AddStudent';

export default function StudentList() {
  const { classID } = useParams();
  const [teacherClass, setTeacherClass] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherClass = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          setError('Authorization token not found');
          return;
        }

        const response = await fetch(`http://localhost:3001/get-class/${classID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch teacher class');
        }
        
        const data = await response.json();
        setTeacherClass(data);
      } catch (error) {
        setError('Error fetching teacher class');
      }
    };

    fetchTeacherClass();
  }, [classID]);
  
    return (
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {teacherClass ? (
              <div>
                <h1>Teacher Class Details</h1>
                <p>Class Name: {teacherClass.className}</p>
                <p>Students:</p>
                <ul>
                  {teacherClass.students.map((student) => (
                    <li key={student._id}>
                      {student.firstName} {student.lastName}
                    </li>
                  ))}
                </ul>
                <p>Login Codes:</p>
                <ul>
                  {teacherClass.students.map((student) => (
                    <li key={`${student._id}-login`}>
                      {student.loginCode}
                    </li>
                  ))}
                </ul>
                <Link to={`/teacher/classlist/${classID}/add-student`}>
                  <button>Add Student</button>
                </Link>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </div>
    );
  }
  
