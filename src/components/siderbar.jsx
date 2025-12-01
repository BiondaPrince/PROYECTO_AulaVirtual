import React from "react";
import "../styles/sidebar.css";

function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* SIDEBAR SUPERPUESTO */}
      <aside className={open ? "overlay-sidebar open" : "overlay-sidebar"}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          <span className="material-icons-outlined">close</span>
        </button>

        <nav className="sidebar-list">
          <a href="#">
            <span className="material-icons-outlined">home</span> <h6>Inicio</h6>
          </a>
          <a href="#">
            <span className="material-icons-outlined">folder</span> <h6>Proyectos</h6>
          </a>
          <a href="#">
            <span className="material-icons-outlined">settings</span> <h6>Configuración</h6>
          </a>
        </nav>
      </aside>

      {/* COLUMNA IZQUIERDA */}
      <aside className="left-column">
        <button className="menu-btn" onClick={() => setOpen(true)}>
          <span className="material-icons-outlined">menu</span>
        </button>

        <nav className="icon-list">
          <a href="#">
            <span className="material-icons-outlined">home</span>
          </a>
          <a href="#">
            <span className="material-icons-outlined">folder</span>
          </a>
          <a href="#">
            <span className="material-icons-outlined">settings</span>
          </a>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
