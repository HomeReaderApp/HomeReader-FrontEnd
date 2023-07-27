import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils/DecodeTokens';

// export default function DeleteStudent() {
//   const { classID, studentID } = useParams();
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     setError(null);

//     try {
//       const token = getAuthToken();
//       const response = await fetch(`http://localhost:3001/${classID}/delete-student/${studentID}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to delete student');
//       } else {
//         // Student deleted successfully
//         console.log('Student deleted successfully');
//         navigate(`/teacher/classlist/${classID}/student-list`);
//       }
//     } catch (error) {
//       console.error('Error deleting student:', error);
//       setError('Failed to delete student');
//     }
//   };

//   return (
//     <div>
//       <h1>Delete Student</h1>
//       <p>Are you sure you want to delete this student?</p>
//       <button onClick={handleDelete}>Delete Student</button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// }
// Function to handle student deletion
export default async function DeleteStudent(studentID){
    const { classID } = useParams();
    const [error, setError] = useState(null);
    const [teacherClass, setTeacherClass] = useState(null);

    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3001/${classID}/delete-student/${studentID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete student');
      } else {
        // Student deleted successfully, update the student list
        setTeacherClass((prevTeacherClass) => ({
          ...prevTeacherClass,
          students: prevTeacherClass.students.filter((student) => student._id !== studentID),
        }));
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Failed to delete student');
    }
  };

