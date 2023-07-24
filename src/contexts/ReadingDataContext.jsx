// import { createContext, useContext, useEffect, useReducer } from "react";
// import { useLocalStorage } from "react-use";

// const initialReadingFormData = [
//     {
//         id: 1,
//         bookName: "Book name",
//         rating: 5,
//         comments: "Comments go here",
//         createdAtData: Date.now(),
//         student: "studentId"
//     }
// ]

// const readingDataReducer = (previousState, instructions) => {
//     let stateEditable = [...previousState]

//     switch (instructions.type){
//         case "create":
//             console.log("TODO: Create reading data form and add to state")
//             break;
//         case "sortByCreatedAtDate":
//             console.log("TODO: List all reading data sorted by date created")
//             break;
//         case "filterByComments":
//             console.log("TODO: Filter reading data that has comments")
//             break;
//         case "filterByRating":
//             console.log("TODO: Filter reading data by books rated highest")
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

// //  StudentssProvider wraps around the component tree. 
// //  Any child component has access to this note data via useStudentData and useStudentDispatch.
//     export default function StudentsProvider(props){
//         const [studentsData, studentDispatch] = useReducer(studentsReducer, initialStudentsData)

//         const [persistentData, setPersistentData] = useLocalStorage('students', initialStudentsData)

//         // useEffect(() => {
//         //     // On app start, overwrite notesData with persistentData 
//         //     studentsDispatch({type:"setup", data: persistentData});
//         // }, []);

//         // confirm that our local storage is updating
//         useEffect(() => {
//             console.log("Local Storage: " + persistentData)
//         }, [persistentData])

//         // Autosave any changes to students from reducer state into localstorage
//         useEffect(() => {
//             setPersistentData(studentsData)
//         }, [studentsData])

//         return (
//             <StudentDataContext.Provider value={studentsData}>
//                 <StudentDispatchContext.Provider value={studentDispatch}>
//                     {props.children}
//                 </StudentDispatchContext.Provider>
//             </StudentDataContext.Provider>
//         )
// }
