import { useState } from "react"
import { useStudentData, useStudentDispatch } from "../contexts/StudentsContext"

export default function StudentLogin(props){

    const globalStudentsData = useStudentData()
    const globalStudentsDispatch = useStudentDispatch

    const [studentLoginCode, setStudentLoginCode] = useState('')
    const [studentLastName, setStudentLastName] = useState('')

    return(
        <div>
            <h1>Student Login</h1>
            <form>
                <label>Login Code:</label>
                <input type="text" name="loginCode" value={studentLoginCode} onChange={(event) => setStudentLoginCode(event.target.value)} />
                <label>Last Name:</label>
                <input type="text" name="lastName" value={studentLastName} onChange={(event) => setStudentLastName(event.target.value)} />
            </form>
            <button>Login</button>
        </div>
    )
}