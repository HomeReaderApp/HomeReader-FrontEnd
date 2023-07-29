
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchStudentData } from '../services/StudentsServices';


export default function StudentProfilePage(){
    const {studentID} = useParams()
    const [studentData, setStudentData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch student data
        const fetchData = async () => {
            const data = await FetchStudentData(studentID);
            if (data) {
                setStudentData(data);
            }
            setLoading(false);
        };

        fetchData();
    }, [studentID]);

    // Function to format the date string into a more readable format
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); 
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
