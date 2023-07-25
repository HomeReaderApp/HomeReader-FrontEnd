import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ReadingForm(){
    // const { studentID } = useParams()

    const [bookName, setBookName] = useState('');
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:3001/submit-reading-form', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            bookName,
            rating,
            comments,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const { message, readingForm } = data;
            setSubmissionMessage(message);
            console.log(readingForm); // Log the newReadingForm data

            //reset the form after successful submission
            setBookName('');
            setRating('');
            setComments('');
        } else {
            throw new Error('Failed to submit reading form.');
        }
        } catch (error) {
        setSubmissionMessage('Failed to submit reading form.');
        }
    };

    return (
        <div>
        <h2>Submit Reading Form</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Book Name:</label>
            <input
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
            />
            </div>
            <div>
            <label>Rating:</label>
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            </div>
            <div>
            <label>Comments:</label>
            <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />
            </div>
            <button type="submit">Submit</button>
        </form>
        {submissionMessage && <p>{submissionMessage}</p>}
        </div>
    );
    };
