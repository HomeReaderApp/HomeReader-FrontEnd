import React from 'react';
import { useParams } from 'react-router-dom';

export default function StudentList() {
  const { classID } = useParams(); // Get the class ID from the URL
  const [students, setStudents] = useState([]);

  // Implement logic to fetch the student list for the specific class
  // You can use the classID to fetch the students associated with this class
  // Example code:
  
  useEffect(() => {
    // Fetch students for the class using classID
    fetchStudentsByClassId(classID)
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));
  }, [classID]);

  return (
    <div>
      <h1>Student List for Class ID: {classID}</h1>
      {/* Display the list of students here */}
      {students.map((student) => (
        <p key={student._id}>{student.name}</p>
      ))}
    </div>
  );
}
