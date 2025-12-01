import React, { useState } from "react";
import "./styles.css";
import Sidebar from "./components/siderbar.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />

      <Navbar />

      <main className="content">
        <Home />
      </main>
    </>
  );
}
