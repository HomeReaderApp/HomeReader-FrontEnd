import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateButton({ studentID, classID }) {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/teacher/classlist/${classID}/update-student/${studentID}`);
  };

  return (
    <button onClick={handleUpdate}>Update</button>
  );
}
