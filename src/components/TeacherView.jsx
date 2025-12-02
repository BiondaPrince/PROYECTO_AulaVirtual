import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/teacherview.css'

const courses = [
  { id: 1, title: 'Diseño de Patrones', desc: 'Gestiona materiales, crea tareas y atiende el foro.' },
  { id: 2, title: 'Administración de Empresas', desc: 'Gestiona materiales, crea tareas y atiende el foro.' },
  { id: 3, title: 'Gestión de Proyectos', desc: 'Gestiona materiales, crea tareas y atiende el foro.' },
  { id: 4, title: 'Desarrollo Web FrontEnd', desc: 'Gestiona materiales, crea tareas y atiende el foro.' },
  { id: 5, title: 'Bases de Datos SQL', desc: 'Gestiona materiales, crea tareas y atiende el foro.' },
  { id: 6, title: 'Ciberseguridad Aplicada', desc: 'Gestiona materiales, crea tareas y atiende el foro.' }
]

export default function TeacherView(){
  return (
    <div className="teacher-page">
      <div className="teacher-header">
        <h2>Panel del Docente</h2>
        <p className="muted">Haz click en el encabezado para expandir cada curso. Usa los botones para abrirlo como docente o alumno.</p>
      </div>

      <div className="accordion" id="coursesAccordion">
          {courses.map((course) => {
            const headerId = `courseHeading${course.id}`
          const collapseId = `courseCollapse${course.id}`
          return (
            <div className="card mb-2" key={course.id}>
              <div className="card-header" id={headerId}>
                <h2 className="mb-0">
                  <button
                    className="btn btn-link course-toggle d-flex justify-content-between align-items-center w-100 text-start"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded="false"
                    aria-controls={collapseId}
                  >
                    <span>{course.title}</span>
                    <span className="chev">▾</span>
                  </button>
                </h2>
              </div>

              <div id={collapseId} className="collapse" aria-labelledby={headerId} data-bs-parent="#coursesAccordion">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="muted mb-0">{course.desc}</p>
                  </div>
                  <div className="d-flex gap-2">
                    <Link to={`/course/${course.id}/teacher`} className="btn btn-outline-primary">Abrir como docente</Link>
                    <Link to={`/course/${course.id}`} className="btn btn-outline-secondary">Abrir como alumno</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
