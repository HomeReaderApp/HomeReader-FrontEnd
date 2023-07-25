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
            <h1>Student Profile Page</h1>
            <h3>We have {globalStudentsData.length} students in storage</h3>
            <h3>List of all students</h3>
            {globalStudentsData.map((student) => {
                return(
                    <div key={student.id}>
                        <h4>{student.firstName} {student.lastName}</h4>

                    </div>
                )
            })}

        </div>
    )
}