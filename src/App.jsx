import React, { useState } from "react";
import "./styles.css";
import Sidebar from "./components/siderbar.jsx";
import Navbar from "./components/navbar.jsx";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />

      <Navbar />

      <main className="content">
        <h1>Pantalla principal</h1>
      </main>
    </>
  );
}
