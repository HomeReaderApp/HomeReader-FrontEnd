import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1>HomeReader app coming soon...</h1>
      <p>A place for teachers and parents to communicate</p>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} /> 
        <Route path="/teacher/login" element={<h1>Login</h1>} /> 
        <Route path="/teacher/register" element={<h1>Register</h1>} /> 
        <Route path="/student/login" element={<h1>Student Login</h1>} /> 
        <Route path="/student/:studentID/reading-form" element={<h1>Student reading form</h1>} /> 
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
