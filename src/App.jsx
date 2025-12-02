import React, { useState } from "react";
import "./styles.css";
import Sidebar from "./components/siderbar.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./components/Home.jsx";
import CourseDetail from "./components/CourseDetail/CourseDetail.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}
