import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils/DecodeTokens';

export default function StudentDropdown() {
  const { classID } = useParams();
  const [teacherClass, setTeacherClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store the selected student
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherClass = async () => {
      try {
        const token = getAuthToken()
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

  const handleStudentChange = (event) => {
    const selectedStudentId = event.target.value;
    setSelectedStudent(selectedStudentId);

    // Navigate to the student profile page when a student is selected
    navigate(`/teacher/classlist/${classID}/studentprofile/${selectedStudentId}`);
  };

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
              <select value={selectedStudent} onChange={handleStudentChange}>
                <option value="">--Select a student--</option>
                {teacherClass.students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

