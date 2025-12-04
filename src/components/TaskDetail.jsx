import React from 'react'
import { useParams, Link } from 'react-router-dom'

function readTasks(courseId){
  try{ const raw = localStorage.getItem(`tasks_course_${courseId}`); return raw ? JSON.parse(raw) : [] }catch(e){ return [] }
}

export default function TaskDetail(){
  const { id, taskId } = useParams()
  const tasks = readTasks(id)
  const task = tasks.find(t => String(t.id) === String(taskId))

  if(!task) return (
    <div className="container mt-4">
      <h3>Tarea no encontrada</h3>
      <Link to={`/course/${id}/teacher`} className="btn btn-link">Volver al curso</Link>
    </div>
  )

  return (
    <div className="container mt-4">
      <h2>{task.title}</h2>
      <p className="muted">Creada: {task.creationDate ? new Date(task.creationDate).toLocaleString() : '—'}</p>
      <p className="muted">Vence: {task.dueDateTime ? new Date(task.dueDateTime).toLocaleString() : (task.dueDate || 'No establecido')}</p>
      <div className="card p-3 mt-3">
        <h5>Descripción</h5>
        <p>{task.description || 'Sin descripción'}</p>
      </div>

      <div className="mt-3">
        <Link to={`/course/${id}/teacher`} className="btn btn-secondary">Volver</Link>
      </div>
    </div>
  )
}
