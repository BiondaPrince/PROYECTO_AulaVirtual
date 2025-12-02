import React from 'react'
import { useParams } from 'react-router-dom'
import CourseNavTabs from '../CourseNavTabs'

export default function ContentView(){
  const { id, week } = useParams()
  const [activeTab, setActiveTab] = React.useState('deliver')

  return (
    <div className="course-week-page container">
      <h2>Curso {id} — Semana {week}</h2>
      <CourseNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="week-page-content mt-3">
        {activeTab === 'deliver' && (
          <section>
            <h3>Contenido</h3>
            <p>Este es el contenido de la semana {week}. Aquí va el material (vídeo, lectura, enlaces).</p>
          </section>
        )}

        {activeTab === 'view' && (
          <section>
            <h3>Ver tareas</h3>
            <p>Listado de tareas asociadas a esta semana (plantilla).</p>
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
