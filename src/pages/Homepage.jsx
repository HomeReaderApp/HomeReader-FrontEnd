
import { useNavigate } from 'react-router-dom';

export default function Homepage(props){

    const navigate = useNavigate()

    const teacherLogin = () => {
        navigate('/teacher/login')
    }

    const studentLogin = () => {
        navigate('/student/login')
    }

    return(
        <div className='readingForm-body'>
        <div className='reading-container'>
            <img className='homepage-logo' src={require('../styles/logo.svg').default} alt="Logo" />
            <h1 className='homepage-title'>HomeReader</h1>
            <p>A place for teachers and parents to communicate and share the successes in home reading</p>
            <div className='login-buttons'>
                <button className='create-button' onClick={teacherLogin}>Teacher Login</button>
                <button className='create-button' onClick={studentLogin}>Student Login</button>
            </div>
        </div>
        </div>
    )
}