import React from "react";
import "../styles/navbar.css";
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <header className="navbar">
      <Link to="/">
        <img
          src="https://i.ibb.co/V01j5DNM/rect1.png"
          alt="logo"
          className="logo"
        />
      </Link>
      <div className="user">
        <Link to="/login" className="user-link">Iniciar sesión</Link>
      </div>
    </header>
  );
}

export default Navbar;