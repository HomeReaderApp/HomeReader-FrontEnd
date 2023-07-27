import { useState, useEffect } from "react"
import { decodeTeacherToken, getAuthToken } from "../utils/DecodeTokens"
import { Link } from 'react-router-dom';
import TeacherClasses from "../components/ClassList";


export default function TeacherPortal(props){
    const [username, setUsername] = useState("")
    const [user_id, setUser_id] = useState(null);
    
    useEffect(() => {
        // Get the auth token from local storage
        const token = getAuthToken();
    
        if (token) {
          // Decode the token to get the username
          const { username, user_id } = decodeTeacherToken(token);
          setUsername(username);
          setUser_id(user_id);
        }
      }, []);
   

    return(
        <div>
            <h1>Teacher Portal</h1>
            <h1>Welcome, {username}</h1>

        {/* Buttons that link to other pages */}
            {/* <Link to="http://localhost:3000/teacher/classes"> */}
            <Link to="/teacher/classes" >
                <button>Teacher classes</button>
            </Link>

            <Link to="/teacher/classlist/classID/studentprofile/studentID">
                <button>Student profile</button>
            </Link>

            <Link to="/teacher/classlist/classID/comments">
                <button>Comments</button>
            </Link>

            <Link to="/teacher/classlist/classID/favouritebooks">
                <button>Favourite books</button>
            </Link>

        </div>
    )
}