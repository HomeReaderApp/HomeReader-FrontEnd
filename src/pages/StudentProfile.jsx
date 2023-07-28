
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAuthToken } from '../utils/DecodeTokens';

export default function StudentProfilePage(){
    const {studentID} = useParams()
    const [studentData, setStudentData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch student data
        const token = getAuthToken()
        const fetchStudentData = async () => {
        try {

            const response = await fetch(`http://localhost:3001/get-student/${studentID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
            });
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStudentData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching student data:', error);
            setLoading(false);
        }
        };

        fetchStudentData();
    }, [studentID]);
    // Function to format the date string into a more readable format
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Adjust the options if needed, e.g., date.toLocaleString('en-US')
    };

    return (
        <div>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
            <h1>Student Details</h1>
            <p>First Name: {studentData.firstName}</p>
            <p>Last Name: {studentData.lastName}</p>
            <p>Year Level: {studentData.yearLevel}</p>
            <p>Login Code: {studentData.loginCode}</p>

            {studentData.readingData && studentData.readingData.length > 0 ? (
                <div>
                <h2>Reading Data</h2>
                <ul>
                    {studentData.readingData.map((readingEntry) => (
                    <li key={readingEntry._id}>
                        <p>Book Name: {readingEntry.bookName}</p>
                        <p>Rating: {readingEntry.rating}</p>
                        <p>Comments: {readingEntry.comments}</p>
                        <p>Date: {formatDateString(readingEntry.date)}</p>
                    </li>
                    ))}
                </ul>
                </div>
            ) : (
                <p>No reading data available.</p>
            )}
            </>
        )}
        </div>
    );
    };
