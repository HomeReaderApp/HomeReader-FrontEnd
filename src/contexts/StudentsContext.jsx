import { createContext, useContext, useReducer } from "react";

const initialStudentsData = [
    {
        id: 1,
        firstName: "Nicole",
        lastName: "Hulett",
        yearLevel: "1",
        loginCode: "123456",
        // not sure if we need this yet
        readingData: [{
            bookName: "Harry Potter",
            rating: 5,
            comments: "Great reading",
            createdAtDate: Date.now(),
            // student: 1
        }]
    }
]

const studentsReducer = (previousState.instructions) => {
    let stateEditable = [...previousState]

    switch (instructions.type){
        case "create":
            console.log("TODO: Create student and add to state")
            break;
        case "update":
            console.log("TODO: Update specific student and update state")
            break;
        case "delete":
            console.log("TODO: Delete specific student and update state")
            break;
        case "sortByAlphabeticalOrder":
            console.log("TODO: Sort students by alphabetical order")
            break;
        default:
            console.log("Invalid instruction type provided, it was" + instruction.type)
            return previousState
    }

    export const StudentDataContext = createContext(null)
    export const StudentDispatchContext = createContext(null)

    export function useStudentData(){
        return useContext(StudentDataContext)
    }

    export function useStudentDispatch(){
        return useContext(StudentDispatchContext)
    }

    export default function StudentsProvider(props){
        const [studentsData, studentDispatch] = useReducer(studentsReducer, initialStudentsData)
    }

        return (
            <StudentDataContext.Provider value={studentsData}>
                <StudentDispatchContext.Provider value={studentDispatch}>
                    {props.children}
                </StudentDispatchContext.Provider>
            </StudentDataContext.Provider>
        )
}
