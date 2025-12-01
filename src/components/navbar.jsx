import React from "react";
import "../styles/navbar.css";

function navbar() {
  return (
    <header className="navbar">
      <img
        src="https://i.ibb.co/V01j5DNM/rect1.png"
        alt="logo"
        className="logo"
      />
      <div className="user">👤 Josué</div>
    </header>
  );
}

export default navbar;