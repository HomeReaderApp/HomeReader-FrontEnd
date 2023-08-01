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
//         case "setup":
//             console.log("Apply persistent data to state now")
//             stateEditable = instructions.data
//             return stateEditable

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

//     export const ReadingDataContext = createContext(null)
//     export const ReadingDataDispatchContext = createContext(null)

//     export function useReadingData(){
//         return useContext(ReadingDataContext)
//     }

//     export function useReadingDataDispatch(){
//         return useContext(ReadingDataDispatchContext)
//     }

// //  ReadingDataProvider wraps around the component tree. 
// //  Any child component has access to this note data via useStudentData and useStudentDispatch.
//     export default function ReadingDataProvider(props){
//         const [readingData, readingDataDispatch] = useReducer(readingDataReducer, initialReadingFormData)

//         const [persistentData, setPersistentData] = useLocalStorage('readingData', initialReadingFormData)

//         useEffect(() => {
//             // On app start, overwrite readingData with persistentData 
//             readingDataDispatch({type:"setup", data: persistentData});
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//         }, []);

//         // confirm that our local storage is updating
//         useEffect(() => {
//             console.log("Local Storage: " + persistentData)
//         }, [persistentData])

//         // Autosave any changes to students from reducer state into localstorage
//         useEffect(() => {
//             setPersistentData(readingData)
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//         }, [readingData])

//         return (
//             <ReadingDataContext.Provider value={readingData}>
//                 <ReadingDataDispatchContext.Provider value={readingDataDispatch}>
//                     {props.children}
//                 </ReadingDataDispatchContext.Provider>
//             </ReadingDataContext.Provider>
//         )
// }
