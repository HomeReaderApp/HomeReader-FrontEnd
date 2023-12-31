import { useState, useEffect } from "react"
import { decodeTeacherToken, getAuthToken } from "../utils/DecodeTokens"
import { Link } from 'react-router-dom'
import Header from "../components/Header";
// import '../styles/App.css';
import '../styles/TeacherPortal.css'



export default function TeacherPortal(props){
    const [username, setUsername] = useState("")
    
    useEffect(() => {
        // Get the auth token from local storage
        const token = getAuthToken();
    
        if (token) {
          // Decode the token to get the username
          const { username } = decodeTeacherToken(token);
          setUsername(username);
        }
      }, []);
   

    return(
        <div>
            <Header />
            <div className='portal-container'>
            <div className="teacher-portal">
                <div className='portal-info'>
                    <h1 className='portal-title'>Teacher Portal</h1>
                    <h1>Welcome, {username}</h1>
                </div>
                <div className='portal-buttons'>
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
            </div>
        </div>
        </div>
    )
}