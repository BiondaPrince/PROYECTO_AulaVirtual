import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/teacherview.css";
import { AuthContext } from "../context/AuthContext";

export default function TeacherView() {
  const { token, user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!token || !token.token) return;

    fetch("http://localhost:8080/curso", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let formatted = (data || []).map((c, index) => ({
          id: c.idCurso || c.id || index + 1,
          title: c.nombre || c.title || `Curso ${index + 1}`,
          desc: c.descripcion || c.desc || "",
          profesor: c.profesor || "",
        }));

        // Mostrar solo cursos asignados al profesor autenticado (si se conoce su nombre)
        const userName =
          (user &&
            (user.name ||
              user.nombre ||
              user.preferred_username ||
              user.username)) ||
          "";
        if (userName) {
          formatted = formatted.filter(
            (c) =>
              (c.profesor || "").toLowerCase().trim() ===
              userName.toLowerCase().trim()
          );
        }

        setCourses(formatted);
      })
      .catch((error) => console.error("Error cargando cursos:", error));
  }, [token, user]);

  return (
    <div className='teacher-page'>
      <div className='teacher-header'>
        <h2>Panel del Docente</h2>
        <p className='muted'>
          Haz click en el encabezado para expandir cada curso. Usa los botones
          para abrirlo como docente o alumno.
        </p>
      </div>

      <div className='accordion' id='coursesAccordion'>
        {courses.length === 0 && (
          <div className='card mb-2'>
            <div className='card-body'>
              No se encontraron cursos. Asegúrate de estar autenticado o de ser
              el profesor asignado.
            </div>
          </div>
        )}
        {courses.map((course) => {
          const headerId = `courseHeading${course.id}`;
          const collapseId = `courseCollapse${course.id}`;
          return (
            <div className='card mb-2' key={course.id}>
              <div className='card-header' id={headerId}>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link course-toggle d-flex justify-content-between align-items-center w-100 text-start'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#${collapseId}`}
                    aria-expanded='false'
                    aria-controls={collapseId}
                  >
                    <span>{course.title}</span>
                    <span className='chev'>▾</span>
                  </button>
                </h2>
              </div>

              <div
                id={collapseId}
                className='collapse'
                aria-labelledby={headerId}
                data-bs-parent='#coursesAccordion'
              >
                <div className='card-body d-flex justify-content-between align-items-center'>
                  <div>
                    <p className='muted mb-0'>{course.desc}</p>
                    <small className='muted'>
                      Profesor: {course.profesor || "—"}
                    </small>
                  </div>
                  <div className='d-flex gap-2'>
                    <Link
                      to={`/course/${course.id}/teacher`}
                      className='btn btn-outline-primary'
                    >
                      Abrir como docente
                    </Link>
                    <Link
                      to={`/course/${course.id}`}
                      className='btn btn-outline-secondary'
                    >
                      Abrir como alumno
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
