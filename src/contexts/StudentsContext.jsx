import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

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

const studentsReducer = (previousState, instructions) => {
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
            console.log("Invalid instruction type provided, it was" + instructions.type)
            return previousState
    }
}

    export const StudentDataContext = createContext(null)
    export const StudentDispatchContext = createContext(null)

    export function useStudentData(){
        return useContext(StudentDataContext)
    }

    export function useStudentDispatch(){
        return useContext(StudentDispatchContext)
    }

//  StudentssProvider wraps around the component tree. 
//  Any child component has access to this note data via useStudentData and useStudentDispatch.
    export default function StudentsProvider(props){
        const [studentsData, studentDispatch] = useReducer(studentsReducer, initialStudentsData)

        const [persistentData, setPersistentData] = useLocalStorage('students', initialStudentsData)

        // useEffect(() => {
        //     // On app start, overwrite notesData with persistentData 
        //     studentsDispatch({type:"setup", data: persistentData});
        // }, []);

        // confirm that our local storage is updating
        useEffect(() => {
            console.log("Local Storage: " + persistentData)
        }, [persistentData])

        // Autosave any changes to students from reducer state into localstorage
        useEffect(() => {
            setPersistentData(studentsData)
        }, [studentsData])

        return (
            <StudentDataContext.Provider value={studentsData}>
                <StudentDispatchContext.Provider value={studentDispatch}>
                    {props.children}
                </StudentDispatchContext.Provider>
            </StudentDataContext.Provider>
        )
}
