import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreateStudent } from '../services/StudentsServices';
import Header from './Header';

export default function CreateStudentForm() {
  const { classID } = useParams(); // Get the classID from the URL parameter

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding state based on the input field name
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'yearLevel') {
      setYearLevel(value);
    } else if (name === 'loginCode') {
      setLoginCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const studentData = {
        firstName,
        lastName,
        yearLevel,
        loginCode
      };

      await CreateStudent(classID, studentData);
        console.log('Student created successfully');
        setFirstName('');
        setLastName('');
        setYearLevel('');
        setLoginCode('');
  
        // Navigate back to the student list page after successful submission
        navigate(`/teacher/classlist/${classID}/student-list`);
      }
     catch (error) {
      console.error('Error creating student:', error.message);
      setError('Failed to create student');
    }
  };
  

  return (
    <div>
      {/* <Header /> */}
      <div className="body">
        <div className="relaxing-container"> 
      <h1>Create Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Year Level:</label>
          <input type="text" name="yearLevel" value={yearLevel} onChange={handleChange} />
        </div>
        <div>
          <label>Login Code:</label>
          <input type="text" name="loginCode" value={loginCode} onChange={handleChange} />
        </div>
        <button className='create-button' type="submit">Create Student</button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </div>
    </div>
  );
}



