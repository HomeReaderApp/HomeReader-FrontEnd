import { useState, useEffect } from "react"
import { decodeTeacherToken, getAuthToken } from "../utils/DecodeTokens"
import { Link } from 'react-router-dom'
import Header from "../components/Header";


export default function TeacherPortal(props){
    const [username, setUsername] = useState("")
    // const [user_id, setUser_id] = useState(null);
    
    useEffect(() => {
        // Get the auth token from local storage
        const token = getAuthToken();
    
        if (token) {
          // Decode the token to get the username
        //   got rid of user_id from destructuring below
          const { username } = decodeTeacherToken(token);
          setUsername(username);
        //   setUser_id(user_id);
        }
      }, []);
   

    return(
        <div>
            <Header />
            <h1>Teacher Portal</h1>
            <h1>Welcome, {username}</h1>

            <Link to="/teacher/classes" >
                <button>Teacher classes</button>
            </Link>

            <Link to="/teacher/class-dropdown">
                <button>Comments</button>
            </Link>

            <Link to="/teacher/favourite-books">
                <button>Favourite books</button>
            </Link>

        </div>
    )
}