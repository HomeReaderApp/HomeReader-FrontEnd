import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuthToken } from '../utils/DecodeTokens';

export default function CreateStudentForm(){
    const { classID } = useParams(); // Get the classID from the URL parameter

    // Now you have access to the classID to use in your component
    console.log('Class ID:', classID)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [loginCode, setLoginCode] = useState('');
    const [error, setError] = useState(null);

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
        const token = getAuthToken()
        const response = await fetch(`http://localhost:3001/${classID}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify({
            firstName,
            lastName,
            yearLevel,
            loginCode,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create student');
        }

        // Handle successful student creation here (e.g., show success message, reset form fields, etc.)
        console.log('Student created successfully');
        setFirstName('');
        setLastName('');
        setYearLevel('');
        setLoginCode('');
        } catch (error) {
        console.error('Error creating student:', error);
        setError('Failed to create student');
        }
    };

    return (
        <div>
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
            <button type="submit">Create Student</button>
        </form>
        {error && <p>{error}</p>}
        </div>
    );
    };
