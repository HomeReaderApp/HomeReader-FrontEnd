// import { createContext, useContext, useEffect, useReducer } from "react";
// import { useLocalStorage } from "react-use";

// const initialStudentsData = [
//     {
//         id: 1,
//         firstName: "First name",
//         lastName: "Second name",
//         yearLevel: "1",
//         loginCode: "123456",
//         // readingData: []
//     }
// ]

// const studentsReducer = (previousState, instructions) => {
//     let stateEditable = [...previousState]

//     switch (instructions.type){
//         case "setup":
//             console.log("Apply persistent data to state now")
//             let localStorageData = instructions.data
//             stateEditable = localStorageData
//             return stateEditable

//         case "create":
//             console.log("TODO: Create student and add to state")
//             let newStudent = instructions.newStudent
//             stateEditable.push(newStudent)
//             return stateEditable

//         case "update":
//             console.log("TODO: Update specific student and update state")
//             break;
//         case "delete":
//             console.log("TODO: Delete specific student and update state")
//             break;
//         case "sortByAlphabeticalOrder":
//             console.log("TODO: Sort students by alphabetical order")
//             break;
//         default:
//             console.log("Invalid instruction type provided, it was" + instructions.type)
//             return previousState
//     }
// }

//     export const StudentDataContext = createContext(null)
//     export const StudentDispatchContext = createContext(null)

//     export function useStudentData(){
//         return useContext(StudentDataContext)
//     }

//     export function useStudentDispatch(){
//         return useContext(StudentDispatchContext)
//     }

// //  StudentsProvider wraps around the component tree. 
// //  Any child component has access to this student data via useStudentData and useStudentDispatch.
//     export default function StudentsProvider(props){
//         const [studentsData, studentsDispatch] = useReducer(studentsReducer, initialStudentsData)

//         const [persistentData, setPersistentData] = useLocalStorage('students', initialStudentsData)

//         useEffect(() => {
//             // On app start, overwrite studentData with persistentData 
//             studentsDispatch({type:"setup", data: persistentData});
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         }, []);

//         // confirm that our local storage is updating
//         useEffect(() => {
//             console.log("Local Storage: " + persistentData)
//         }, [persistentData])

//         // Autosave any changes to students from reducer state into localstorage
//         useEffect(() => {
//             setPersistentData(studentsData)
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         }, [studentsData])

//         return (
//             <StudentDataContext.Provider value={studentsData}>
//                 <StudentDispatchContext.Provider value={studentsDispatch}>
//                     {props.children}
//                 </StudentDispatchContext.Provider>
//             </StudentDataContext.Provider>
//         )
// }
