import React from 'react'
import { Link } from 'react-router-dom'
import StudentUpload from '../StudentUpload'

export default function WeekItem({ week, parentId, courseId, tasks = [] }) {
  const collapseId = `collapse${week.id}`
  const headingId = `heading${week.id}`

  return (
    <div className="card week-card" key={week.id}>
      <div className="card-header" id={headingId}>
        <h2 className="mb-0">
          <button
            className="btn btn-link week-toggle d-flex justify-content-between align-items-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-expanded="false"
            aria-controls={collapseId}
          >
            <span>{week.title}</span>
            <span className="chev">▾</span>
          </button>
        </h2>
      </div>

      <div id={collapseId} className="collapse" aria-labelledby={headingId} data-bs-parent={`#${parentId}`}>
        <div className="card-body">
          <p className="week-content">{week.content}</p>

          {/* Tasks for this week */}
          {tasks && tasks.length > 0 && (
            <div className="week-tasks mt-3">
              {tasks.map(t => (
                <div key={t.id} className="card mb-2">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{t.title}</h6>
                      <p className="muted mb-1">{t.description}</p>
                      <small className="muted">Vence: {t.dueDateTime ? new Date(t.dueDateTime).toLocaleString() : 'No establecido'}</small>
                    </div>
                    <div>
                      <StudentUpload courseId={courseId} taskId={t.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="week-actions mt-3 d-flex gap-2">
            <Link to={`/course/${courseId}/content/${week.id}`} className="btn btn-outline-primary">Ir al contenido</Link>
            <Link to={`/course/${courseId}/submit/${week.id}`} className="btn btn-outline-success">Entregar tarea</Link>
            <Link to={`/course/${courseId}/forum#week-${week.id}`} className="btn btn-outline-secondary">Ver foro</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
