import StudentsProvider, { useStudentData } from "../contexts/StudentsContext"

export default function StudentProfilePage(props){
    const globalStudentsData = useStudentData()

    return(
        <div>
            <h1>Student Profile Page</h1>
            <h3>We have {globalStudentsData.length} students in storage</h3>
            <h3>List of all students</h3>
            {globalStudentsData.map((student) => {
                return(
                    <div key={student.id}>
                        <h4>{student.firstName}{student.lastName}</h4>

                    </div>
                )
            })}
        </div>
    )
}