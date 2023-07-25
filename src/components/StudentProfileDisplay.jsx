import { useState } from "react"
import { useStudentData } from "../contexts/StudentsContext"

export default function StudentDisplay(props){

    const{_id} = props
    const [localStudent, setLocalStudent] = useState({})

    const globalStudentsData = useStudentData()

    useEffect(() => {
	
		setLocalStudent(globalStudentsData.find(globalSpecificStudent => {

			return globalSpecificStudent._id === _id;
		}));


	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [globalStudentsData, _id])

    

	return(
		<div>
			<h1>{localStudent.firstName} {localStudent.lastName}</h1>
            <h3>{localStudent.yearLevel}</h3>
            <h4>{localStudent.readingData}</h4>	
		</div>
	)

}