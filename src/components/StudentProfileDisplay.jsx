import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchTeacherClass } from '../services/ClassServices';

export default function StudentDropdown() {
  const { classID } = useParams();
  const [teacherClass, setTeacherClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store the selected student
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchTeacherClass(classID); // Use the service function to fetch teacher class details
        setTeacherClass(data);
      } catch (error) {
        setError('Error fetching teacher class');
      }
    };

    fetchData();
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

