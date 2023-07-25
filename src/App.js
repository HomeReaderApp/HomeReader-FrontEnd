import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TeacherLogin from "./pages/TeacherLogin";
import StudentLogin from "./components/StudentLogin";
import RegisterTeacherUser from "./components/TeacherRegister";
import ReadingForm from "./components/ReadingForm";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/teacher/login" element={<TeacherLogin />} /> 
        <Route path="/teacher/register" element={<RegisterTeacherUser />} /> 
        <Route path="/student/login" element={<StudentLogin />} /> 
        <Route path="/student/:studentID/reading-form" element={<ReadingForm />} /> 
        <Route path="/teacher/portal" element={<h1>Teacher Portal</h1>} /> 
        <Route path="/teacher/classes" element={<h1>Teacher classes</h1>} /> 
        <Route path="/teacher/classlist/:classID" element={<h1>Teacher class</h1>} /> 
        <Route path="/teacher/classlist/:classID/addstudent" element={<h1>Add student</h1>} /> 
        <Route path="/teacher/classlist/:classID/updatestudent/:studentID" element={<h1>Update student</h1>} /> 
        <Route path="/teacher/classlist/:classID/studentprofile/:studentID" element={<h1>Student profile</h1>} /> 
        <Route path="/teacher/classlist/:classID/comments" element={<h1>Comments</h1>} /> 
        <Route path="/teacher/classlist/:classID/favouritebooks" element={<h1>Favourite books</h1>} /> 
      </Routes>
    </div>
  );
}

export default App;
