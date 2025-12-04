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

  // load tasks once and group by week
  const [tasksByWeek, setTasksByWeek] = React.useState({})

  React.useEffect(()=>{
    try{
      const raw = localStorage.getItem(`tasks_course_${course.id}`)
      const all = raw ? JSON.parse(raw) : []
      const grouped = {}
      all.forEach(t => {
        const wk = t.week || 0
        if(!grouped[wk]) grouped[wk] = []
        grouped[wk].push(t)
      })
      setTasksByWeek(grouped)
    }catch(e){ setTasksByWeek({}) }
  },[course.id])

  return (
    <div className="course-detail-container">
      <div className="course-header">
        <button className="btn btn-link back-btn" onClick={() => navigate(-1)}>◀ Volver</button>
        <h2>{course.title}</h2>
        <p className="muted">Total de semanas ({weeks.length})</p>
      </div>

      <div className="accordion" id="weeksAccordion">
        {weeks.map((w) => (
          <WeekItem key={w.id} week={w} parentId="weeksAccordion" courseId={course.id} tasks={tasksByWeek[w.id] || []} />
        ))}
      </div>

      {/* Nota: las tareas ahora se muestran dentro de cada semana en su acordeón. */}

      <section id="forum" className="course-section">
        <h3>Foro</h3>
        <p className="muted">Foro de consultas del curso (plantilla).</p>
      </section>

      <section id="submissions" className="course-section">
        <h3>Entregas</h3>
        <p className="muted">Listado de tus entregas para este curso.</p>
        <StudentSubmissions courseId={course.id} />
      </section>
    </div>
  )
}

// Note: StudentTasks and the inline StudentUpload were removed. Tasks and uploads are now shown per-week inside each WeekItem using the shared `StudentUpload` component.

function StudentSubmissions({ courseId }){
  const [items, setItems] = React.useState([])

  React.useEffect(()=>{
    try{
      const all = []
      // iterate over localStorage keys
      for(let i=0;i<localStorage.length;i++){
        const key = localStorage.key(i)
        if(!key) continue
        const m = key.match(new RegExp(`^submissions_${courseId}_(\\d+)$`))
        if(m){
          const taskId = m[1]
          const raw = localStorage.getItem(key)
          const arr = raw ? JSON.parse(raw) : []
          arr.forEach(a => all.push({ taskId, name: a.name, date: a.date }))
        }
      }
      setItems(all)
    }catch(e){ setItems([]) }
  },[courseId])

  if(items.length === 0) return <div className="card p-3">Aún no tienes entregas.</div>

  return (
    <div className="submissions-list">
      {items.map((it, idx) => (
        <div key={idx} className="submission-item card mb-2 p-2">
          <div><strong>{it.name}</strong></div>
          <div className="muted">Tarea: {it.taskId} — {new Date(it.date).toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
