import React, { useState } from "react";
import "../styles/styles.css";
import Sidebar from "../components/siderbar.jsx";
import Navbar from "../components/navbar.jsx";
import Home from "../components/Home.jsx";
import CourseDetail from "../components/CourseDetail/CourseDetail.jsx";
import ContentView from "../components/CourseDetail/ContentView.jsx";
import SubmitView from "../components/CourseDetail/SubmitView.jsx";
import ForumView from "../components/CourseDetail/ForumView.jsx";
import TaskDetail from "../components/TaskDetail.jsx";
import Login from "../components/Auth/Login.jsx";
import Register from "../components/Auth/Register.jsx";
import TeacherView from "../components/TeacherView.jsx";
import CourseTeacher from "../components/CourseTeacher.jsx";
import { Routes, Route, useLocation } from 'react-router-dom'

export default function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const hideLayout = ['/login','/register'].includes(location.pathname)

  return (
    <>
      {!hideLayout && <Sidebar open={open} setOpen={setOpen} />}

      {!hideLayout && <Navbar />}

      <main className={hideLayout ? 'content no-layout' : 'content'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/:id/content/:week" element={<ContentView />} />
          <Route path="/course/:id/submit/:week" element={<SubmitView />} />
          <Route path="/course/:id/forum" element={<ForumView />} />
          <Route path="/course/:id/task/:taskId" element={<TaskDetail />} />
          <Route path="/course/:id/teacher" element={<CourseTeacher />} />
          <Route path="/teacher" element={<TeacherView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}
