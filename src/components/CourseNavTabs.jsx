import React from 'react'

import '../styles/coursenav.css'

export default function CourseNavTabs({ activeTab, setActiveTab }){
  return (
    <div className="course-nav-tabs">
      <nav>
        <button type="button" className={`nav-item btn deliver ${activeTab === 'deliver' ? 'active' : ''}`} onClick={()=>setActiveTab('deliver')}>Entregar tareas</button>
        <button type="button" className={`nav-item btn view ${activeTab === 'view' ? 'active' : ''}`} onClick={()=>setActiveTab('view')}>Ver tareas</button>
        <button type="button" className={`nav-item btn forum ${activeTab === 'forum' ? 'active' : ''}`} onClick={()=>setActiveTab('forum')}>Foro de consultas</button>
        <button type="button" className={`nav-item btn announcements ${activeTab === 'announcements' ? 'active' : ''}`} onClick={()=>setActiveTab('announcements')}>Anuncios</button>
      </nav>
    </div>
  )
}
