import React from 'react'
import { useParams } from 'react-router-dom'
import CourseNavTabs from '../CourseNavTabs'
import StudentUpload from '../StudentUpload'

export default function SubmitView(){
  const { id, week } = useParams()
  const [activeTab, setActiveTab] = React.useState('deliver')

  return (
    <div className="course-week-page container">
      <h2>Entrega — Curso {id} — Semana {week}</h2>
      <CourseNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="week-page-content mt-3">
        {activeTab === 'deliver' && (
          <section>
            <h3>Subir entrega</h3>
            <StudentUpload storageKey={`week_submissions_${id}_${week}`} />
          </section>
        )}

        {activeTab === 'view' && (
          <section>
            <h3>Ver tareas</h3>
            <p>Listado de tareas y entregas esperadas para esta semana.</p>
          </section>
        )}

        {activeTab === 'forum' && (
          <section>
            <h3>Foro</h3>
            <p>Foro de la semana {week} (plantilla).</p>
          </section>
        )}

        {activeTab === 'announcements' && (
          <section>
            <h3>Anuncios</h3>
            <p>No hay anuncios para esta semana.</p>
          </section>
        )}
      </div>
    </div>
  )
}
