import { useEffect, useState } from "react";
import { useStudentData } from "../contexts/StudentsContext"
import { useNavigate } from 'react-router-dom';



export default function Homepage(props){
    const globalStudentsData = useStudentData()

    const navigate = useNavigate()

    const teacherLogin = () => {
        navigate('/teacher/login')
    }

    const studentLogin = () => {
        navigate('/student/login')
    }

    return(
        <div>
            <h1>HomeReader app coming soon...</h1>
            <p>A place for teachers and parents to communicate and share the successes in home reading</p>

            <button onClick={teacherLogin}>Teacher Login</button>
            <button onClick={studentLogin}>Student Login</button>

        </div>
    )
}