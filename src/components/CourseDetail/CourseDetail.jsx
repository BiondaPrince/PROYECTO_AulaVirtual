import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './coursedetail.css'
import WeekItem from './WeekItem.jsx'

const courses = [
  { id: 1, title: 'Diseño de Patrones' },
  { id: 2, title: 'Administración de Empresas' },
  { id: 3, title: 'Gestión de Proyectos' },
  { id: 4, title: 'Desarrollo Web Frontend' },
  { id: 5, title: 'Bases de Datos SQL' },
  { id: 6, title: 'Ciberseguridad Aplicada' }
]

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find(c => String(c.id) === String(id)) || { id, title: 'Curso' }

  const weeks = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    title: `Semana ${i + 1}`,
    content: `Contenido de la semana ${i + 1}.`
  }))

  return (
    <div className="course-detail-container">
      <div className="course-header">
        <button className="btn btn-link back-btn" onClick={() => navigate(-1)}>◀ Volver</button>
        <h2>{course.title}</h2>
        <p className="muted">Total de semanas ({weeks.length})</p>
      </div>

      <div className="accordion" id="weeksAccordion">
        {weeks.map((w) => (
          <WeekItem key={w.id} week={w} parentId="weeksAccordion" />
        ))}
      </div>
    </div>
  )
}
