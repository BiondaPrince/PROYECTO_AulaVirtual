import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import CourseNavTabs from '../CourseNavTabs'

export default function ForumView() {
    const { id } = useParams()
    const location = useLocation()
    const [activeTab, setActiveTab] = React.useState('forum')
    const weekHash = location.hash ? location.hash.replace('#week-', '') : null
    const [threads, setThreads] = React.useState([])
    const [expandedThreads, setExpandedThreads] = React.useState([])
    const [commentInputs, setCommentInputs] = React.useState({})

    React.useEffect(() => {
        try {
            const raw = localStorage.getItem(`forum_course_${id}`)
            setThreads(raw ? JSON.parse(raw) : [])
        } catch (e) { setThreads([]) }
    }, [id])

    const toggleThread = (threadId) => {
        setExpandedThreads(prev => prev.includes(threadId) ? prev.filter(x => x !== threadId) : [...prev, threadId])
    }

    const setCommentForThread = (threadId, value) => {
        setCommentInputs(prev => ({ ...prev, [threadId]: value }))
    }

    const submitComment = (threadId) => {
        const text = (commentInputs[threadId] || '').trim()
        if (!text) return
        const key = `forum_course_${id}`
        const existing = JSON.parse(localStorage.getItem(key) || '[]')
        const idx = existing.findIndex(t => String(t.id) === String(threadId))
        if (idx === -1) return
        const post = { id: Date.now(), author: 'Alumno', message: text, date: new Date().toISOString() }
        existing[idx].posts = existing[idx].posts || []
        existing[idx].posts.push(post)
        localStorage.setItem(key, JSON.stringify(existing))
        setThreads(existing)
        setCommentInputs(prev => ({ ...prev, [threadId]: '' }))
        if (!expandedThreads.includes(threadId)) setExpandedThreads(prev => [...prev, threadId])
    }

    return (
        <div className="course-week-page container">
            <h2>Foro del curso {id}{weekHash ? ` — Semana ${weekHash}` : ''}</h2>
            <CourseNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="week-page-content mt-3">
                <section>
                    <h3>Foro de consultas</h3>
                    <p>Foros y respuestas. Pulsa "Ver foro" para leer y responder.</p>
                    {weekHash && <div className="card p-2 mt-2">Mostrando foros relacionados con la Semana {weekHash} (simulado).</div>}

                    <div className="forum-list mt-3">
                        {threads.length === 0 && <p>No hay foros publicados.</p>}
                        {threads.map(t => (
                            <div key={t.id} className="card mb-2">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5>{t.title}</h5>
                                            <p className="muted">{t.message}</p>
                                            <small className="muted">Creado: {t.date ? new Date(t.date).toLocaleString() : ''}</small>
                                        </div>
                                        <div>
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => toggleThread(t.id)}>{expandedThreads.includes(t.id) ? 'Cerrar' : 'Ver foro'}</button>
                                        </div>
                                    </div>

                                    {expandedThreads.includes(t.id) && (
                                        <div className="mt-3">
                                            <div className="posts-list mb-2">
                                                {(t.posts || []).length === 0 && <div className="muted">No hay respuestas aún.</div>}
                                                {(t.posts || []).map(p => (
                                                    <div key={p.id} className="card p-2 mb-1">
                                                        <div><strong>{p.author}</strong> <small className="muted">{p.date ? new Date(p.date).toLocaleString() : ''}</small></div>
                                                        <div>{p.message}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="comment-form">
                                                <textarea className="form-control mb-1" placeholder="Escribir respuesta..." value={commentInputs[t.id] || ''} onChange={e => setCommentForThread(t.id, e.target.value)} />
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-primary" onClick={() => submitComment(t.id)}>Responder</button>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => { setCommentForThread(t.id, ''); setExpandedThreads(prev => prev.filter(id => id !== t.id)) }}>Cerrar</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
