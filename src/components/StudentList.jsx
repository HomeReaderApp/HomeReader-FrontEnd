
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UpdateButton from './UpdateButton';
import Header from './Header';
import { FetchTeacherClass } from '../services/ClassServices';
import { deleteStudent } from '../services/StudentsServices';
import '../styles/StudentList.css'

export default function StudentList() {
  const { classID } = useParams();
  const [teacherClass, setTeacherClass] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchTeacherClass(classID);
        setTeacherClass(data);
      } catch (error) {
        setError('Error fetching teacher class');
      }
    };

    fetchData();
  }, [classID]);

  const handleDeleteStudent = async (studentID) => {
    try {
      await deleteStudent(studentID);
      // Student deleted successfully, update the student list
      setTeacherClass((prevTeacherClass) => ({
        ...prevTeacherClass,
        students: prevTeacherClass.students.filter((student) => student._id !== studentID),
      }));
    } catch (error) {
      setError('Failed to delete student');
    }
  };

  return (
    <div>
      <Header />
      <div>
      <div className='portal-container'>
        <div className="teacher-portal">
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <div>
              {teacherClass ? (
                <div>
                  <h1>Teacher Class Details</h1>
                  <p>Class Name: {teacherClass.className}</p>
                  <div className='student-details'>
                    <div className='students'>
                      <p>Students:</p>
                      <ul className='student-list'>
                        {teacherClass.students.map((student) => (
                          <li key={student._id}>
                            <div className="teacher-details">
                              <div className="name">
                                <Link to={`/teacher/classlist/${classID}/studentprofile/${student._id}`}>
                                  {student.firstName} {student.lastName}
                                </Link>
                              </div>
                              <div className="login-code">{student.loginCode}</div>
                              <div className="student-buttons">
                                <button className='button' onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                                <UpdateButton studentID={student._id} classID={classID} />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* <div className='login-codes'>
                      <p>Login Codes:</p>
                      <ul>
                        {teacherClass.students.map((student) => (
                          <li key={`${student._id}-login`}>
                            {student.loginCode}
                          </li>
                        ))}
                      </ul>
                    </div> */}
                  </div>
                  <Link to={`/teacher/classlist/${classID}/add-student`}>
                    <button className='create-button'>Add Student</button>
                  </Link>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

        </div>
      );
    }



