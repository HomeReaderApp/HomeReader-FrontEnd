import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TeacherLogin from "./pages/TeacherLogin";
import StudentLogin from "./components/StudentLogin";
import RegisterTeacherUser from "./components/TeacherRegister";
import ReadingForm from "./components/ReadingForm";
import TeacherPortal from "./pages/TeacherPortal";
import TeacherClasses from "./components/ClassList";
import CreateStudentForm from "./components/AddStudent";
import StudentList from "./components/StudentList";
import UpdateStudentForm from "./components/UpdateStudent";
import StudentProfilePage from "./pages/StudentProfile";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/teacher/login" element={<TeacherLogin />} /> 
        <Route path="/teacher/register" element={<RegisterTeacherUser />} /> 
        <Route path="/student/login" element={<StudentLogin />} /> 
        <Route path="/student/:studentID/reading-form" element={<ReadingForm />} /> 
        <Route path="/teacher/:teacherID/portal" element={<TeacherPortal />} /> 
        <Route path="/teacher/classes" element={<TeacherClasses /> } />
        <Route path="/teacher/classlist/:classID/student-list" element={<StudentList />} /> 
        <Route path="/teacher/classlist/:classID/add-student" element={<CreateStudentForm />} /> 
        <Route path="/teacher/classlist/:classID/update-student/:studentID" element={<UpdateStudentForm />} /> 
        <Route path="/teacher/classlist/:classID/studentprofile/:studentID" element={<StudentProfilePage /> } /> 
        <Route path="/teacher/classlist/:classID/comments" element={<h1>Comments</h1>} /> 
        <Route path="/teacher/classlist/:classID/favouritebooks" element={<h1>Favourite books</h1>} /> 
      </Routes>
    </div>
  );
}

export default App;
