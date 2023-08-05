
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchStudentData } from '../services/StudentsServices';
import Header from '../components/Header';
import '../styles/StudentProfile.css'


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
        <Header />
        <div className='profile-container'>
        <div className="teacher-portal">
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
            <h1>Student Details</h1>
            <div className='student-details' >
                <p>First Name: {studentData.firstName}</p>
                <p>Last Name: {studentData.lastName}</p>
                <p>Year Level: {studentData.yearLevel}</p>
                <p>Login Code: {studentData.loginCode}</p>
            </div>

            {studentData.readingData && studentData.readingData.length > 0 ? (
                <div className='reading-details'>
                <h2>Reading Data</h2>
                <h3>
                Total Books Read: {studentData.readingData.length}
              </h3>
                <ul>
                    <div className='card-container'>
                    {studentData.readingData.map((readingEntry) => (
                    <li className='card' key={readingEntry._id}>
                        <p>Book Name: {readingEntry.bookName}</p>
                        <p>Rating: {readingEntry.rating}</p>
                        <p>Comments: {readingEntry.comments}</p>
                        <p>Date: {formatDateString(readingEntry.date)}</p>
                    </li>
                    ))}
                    </div>
                </ul>
                </div>
            ) : (
                <p>No reading data available.</p>
            )}
            </>
        )}
        </div>
        </div>
        </div>
    );
    };
