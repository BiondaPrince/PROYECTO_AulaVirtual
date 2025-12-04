import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import { AuthContext } from "../context/AuthContext";

function Sidebar({ open, setOpen }) {
  const { isProfesor } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (isProfesor === true) navigate("/teacher");
    else navigate("/");
    setOpen(false);
  };

  return (
    <>
      {/* SIDEBAR SUPERPUESTO */}
      <aside className={open ? "overlay-sidebar open" : "overlay-sidebar"}>
        <button className='close-btn' onClick={() => setOpen(false)}>
          <span className='material-icons-outlined'>close</span>
        </button>

        <nav className='sidebar-list'>
          <a href='/' onClick={handleHomeClick}>
            <span className='material-icons-outlined'>home</span>{" "}
            <h6>Inicio</h6>
          </a>
          <a href='#'>
            <span className='material-icons-outlined'>folder</span>{" "}
            <h6>Proyectos</h6>
          </a>
          <a href='#'>
            <span className='material-icons-outlined'>settings</span>{" "}
            <h6>Configuración</h6>
          </a>
        </nav>
      </aside>

      {/* COLUMNA IZQUIERDA */}
      <aside className='left-column'>
        <button className='menu-btn' onClick={() => setOpen(true)}>
          <span className='material-icons-outlined'>menu</span>
        </button>

        <nav className='icon-list'>
          <a href='/' onClick={handleHomeClick}>
            <span className='material-icons-outlined'>home</span>
          </a>
          <a href='#'>
            <span className='material-icons-outlined'>folder</span>
          </a>
          <a href='#'>
            <span className='material-icons-outlined'>settings</span>
          </a>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
