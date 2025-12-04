import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./CourseDetail/coursedetail.css";
import "../styles/courseteacher.css";
import CourseNavTabs from "./CourseNavTabs";
import { AuthContext } from "../context/AuthContext";

function readTasks(courseId) {
  try {
    const raw = localStorage.getItem(`tasks_course_${courseId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function writeTasks(courseId, tasks) {
  localStorage.setItem(`tasks_course_${courseId}`, JSON.stringify(tasks));
}

export default function CourseTeacher() {
  const { id } = useParams();
  const courseId = id;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("deliver");
  const [tasks, setTasks] = useState(() => readTasks(courseId));
  const [forumThreads, setForumThreads] = useState([]);
  const [expandedThreads, setExpandedThreads] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [showForumForm, setShowForumForm] = useState(false);
  const [forumFormTitle, setForumFormTitle] = useState("");
  const [forumFormMessage, setForumFormMessage] = useState("");
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementTitleInput, setAnnouncementTitleInput] = useState("");
  const [announcementMessageInput, setAnnouncementMessageInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");
  const [weekNumber, setWeekNumber] = useState("1");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    setTasks(readTasks(courseId));
    try {
      const rawF = localStorage.getItem(`forum_course_${courseId}`);
      setForumThreads(rawF ? JSON.parse(rawF) : []);
    } catch (e) {
      setForumThreads([]);
    }
    try {
      const rawA = localStorage.getItem(`announcements_course_${courseId}`);
      setAnnouncements(rawA ? JSON.parse(rawA) : []);
    } catch (e) {
      setAnnouncements([]);
    }
  }, [courseId]);

  const handleForumFormSubmit = (e) => {
    e.preventDefault();
    const title = (forumFormTitle || "").trim();
    if (!title) return;
    const message = forumFormMessage;
    const payload = {
      curso: Number(courseId),
      titulo: title,
      mensajeInicial: message
    }

    const key = `forum_course_${courseId}`

    (async () => {
      try {
        const res = await fetch('http://localhost:8080/foro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && token.token ? { Authorization: `Bearer ${token.token}` } : {})
          },
          body: JSON.stringify(payload)
        })

        if (res.ok) {
          const created = await res.json().catch(() => null)
          const existing = JSON.parse(localStorage.getItem(key) || '[]')
          const thread = created && created.id ? {
            id: created.id,
            title: created.titulo || created.title || title,
            message: created.mensajeInicial || created.message || message,
            date: created.date || new Date().toISOString(),
            posts: created.posts || []
          } : { id: Date.now(), title, message, date: new Date().toISOString(), posts: [] }

          existing.unshift(thread)
          localStorage.setItem(key, JSON.stringify(existing))
          setForumThreads(existing)
        } else {
          // fallback local
          const existing = JSON.parse(localStorage.getItem(key) || '[]')
          const thread = { id: Date.now(), title, message, date: new Date().toISOString(), posts: [] }
          existing.unshift(thread)
          localStorage.setItem(key, JSON.stringify(existing))
          setForumThreads(existing)
        }
      } catch (err) {
        console.error('Error creando foro:', err)
        const existing = JSON.parse(localStorage.getItem(key) || '[]')
        const thread = { id: Date.now(), title, message, date: new Date().toISOString(), posts: [] }
        existing.unshift(thread)
        localStorage.setItem(key, JSON.stringify(existing))
        setForumThreads(existing)
      } finally {
        setForumFormTitle('')
        setForumFormMessage('')
        setShowForumForm(false)
        setActiveTab('forum')
      }
    })()
    localStorage.setItem(key, JSON.stringify(existing));
    setForumThreads(existing);
    setForumFormTitle("");
    setForumFormMessage("");
    setShowForumForm(false);
    setActiveTab("forum");
  };

  const handleAnnouncementFormSubmit = (e) => {
    e.preventDefault();
    const title = (announcementTitleInput || "").trim();
    if (!title) return;
    const message = announcementMessageInput;

    const key = `announcements_course_${courseId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const announcement = {
      id: Date.now(),
      title,
      message,
      date: new Date().toISOString(),
    };
    existing.unshift(announcement);
    localStorage.setItem(key, JSON.stringify(existing));
    setAnnouncements(existing);
    setAnnouncementTitleInput("");
    setAnnouncementMessageInput("");
    setShowAnnouncementForm(false);
    setActiveTab("announcements");
  };

  const toggleThread = (threadId) => {
    setExpandedThreads((prev) =>
      prev.includes(threadId)
        ? prev.filter((id) => id !== threadId)
        : [...prev, threadId]
    );
  };

  const setCommentForThread = (threadId, value) => {
    setCommentInputs((prev) => ({ ...prev, [threadId]: value }));
  };

  const submitComment = (threadId) => {
    const text = (commentInputs[threadId] || "").trim();
    if (!text) return;
    const key = `forum_course_${courseId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const idx = existing.findIndex((t) => String(t.id) === String(threadId));
    if (idx === -1) return;
    const post = {
      id: Date.now(),
      author: "Docente",
      message: text,
      date: new Date().toISOString(),
    };
    existing[idx].posts = existing[idx].posts || [];
    existing[idx].posts.push(post);
    localStorage.setItem(key, JSON.stringify(existing));
    setForumThreads(existing);
    setCommentInputs((prev) => ({ ...prev, [threadId]: "" }));
    if (!expandedThreads.includes(threadId))
      setExpandedThreads((prev) => [...prev, threadId]);
  };

  useEffect(() => {
    // Initialize active tab based on URL hash if present
    if (location && location.hash) {
      const hash = location.hash.replace("#", "");
      if (hash === "forum") setActiveTab("forum");
      else if (hash === "tasks" || hash === "deliver") setActiveTab("deliver");
      else if (hash === "view") setActiveTab("view");
      else if (hash === "announcements") setActiveTab("announcements");
    }
  }, [location]);

  async function handleCreate(e) {
    e.preventDefault();

    const payload = {
      curso: Number(courseId),
      titulo: title || "Nueva tarea",
      descripcion: description,
      fechaEntrega: dueDateTime ? new Date(dueDateTime).toISOString() : null,
      semana: Number(weekNumber),
    };

    try {
      const res = await fetch("http://localhost:8080/tarea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && token.token
            ? { Authorization: `Bearer ${token.token}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Si el backend devuelve la tarea creada, úsala; si no, creamos una local
        const created = await res.json().catch(() => null);
        const newTask =
          created && created.id
            ? {
                id: created.id,
                title: created.titulo || created.title || payload.titulo,
                description: created.descripcion || payload.descripcion,
                creationDate: created.creationDate || new Date().toISOString(),
                dueDateTime: created.fechaEntrega || payload.fechaEntrega,
                week: created.semana || payload.semana,
              }
            : {
                id: Date.now(),
                title: payload.titulo,
                description: payload.descripcion,
                creationDate: new Date().toISOString(),
                dueDateTime: payload.fechaEntrega,
                week: payload.semana,
              };

        const updated = [newTask, ...tasks];
        setTasks(updated);
        writeTasks(courseId, updated);
        setTitle("");
        setDescription("");
        setDueDateTime("");
      } else {
        // Fallback: guardar localmente si falla el POST
        const newTask = {
          id: Date.now(),
          title: payload.titulo,
          description: payload.descripcion,
          creationDate: new Date().toISOString(),
          dueDateTime: payload.fechaEntrega,
          week: payload.semana,
        };
        const updated = [newTask, ...tasks];
        setTasks(updated);
        writeTasks(courseId, updated);
        setTitle("");
        setDescription("");
        setDueDateTime("");
      }
    } catch (err) {
      console.error("Error creando tarea:", err);
      // fallback local
      const newTask = {
        id: Date.now(),
        title: payload.titulo,
        description: payload.descripcion,
        creationDate: new Date().toISOString(),
        dueDateTime: payload.fechaEntrega,
        week: payload.semana,
      };
      const updated = [newTask, ...tasks];
      setTasks(updated);
      writeTasks(courseId, updated);
      setTitle("");
      setDescription("");
      setDueDateTime("");
    }
  }

  return (
    <div className='course-teacher-page'>
      <div className='teacher-topnav'>
        <CourseNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className='teacher-content'>
        {activeTab === "deliver" && (
          <section className='teacher-section'>
            <h3>Creación de tareas</h3>
            <form onSubmit={handleCreate} className='task-form'>
              <input
                placeholder='Título de la tarea'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder='Descripción'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className='d-flex gap-2'>
                <label className='form-group w-33'>
                  Semana
                  <select
                    className='form-control'
                    value={weekNumber}
                    onChange={(e) => setWeekNumber(e.target.value)}
                  >
                    {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='form-group w-33'>
                  Fecha y hora de cierre
                  <input
                    type='datetime-local'
                    className='form-control'
                    value={dueDateTime}
                    onChange={(e) => setDueDateTime(e.target.value)}
                  />
                </label>
              </div>
              <div className='d-flex gap-2'>
                <label className='form-group w-50'>
                  Semana
                  <select
                    className='form-control'
                    value={weekNumber}
                    onChange={(e) => setWeekNumber(e.target.value)}
                  >
                    {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='form-group w-50'>
                  Fecha y hora de cierre
                  <input
                    type='datetime-local'
                    className='form-control'
                    value={dueDateTime}
                    onChange={(e) => setDueDateTime(e.target.value)}
                  />
                </label>
              </div>

              <div className='mt-2 d-flex gap-2 align-items-center'>
                <button className='btn btn-primary' type='submit'>
                  Crear tarea
                </button>
              </div>
            </form>

            <div className='teacher-tasks-list'>
              {tasks.length === 0 && <p>No hay tareas creadas.</p>}
              {tasks.map((t) => (
                <div key={t.id} className='task-card card mb-2'>
                  <div className='card-body d-flex justify-content-between align-items-center'>
                    <div>
                      <h5>{t.title}</h5>
                      <p className='muted mb-1'>{t.description}</p>
                      <small className='muted'>
                        Creada:{" "}
                        {t.creationDate
                          ? new Date(t.creationDate).toLocaleString()
                          : "—"}
                      </small>
                      <br />
                      <small className='muted'>
                        Vence:{" "}
                        {t.dueDateTime
                          ? new Date(t.dueDateTime).toLocaleString()
                          : t.dueDate || "No establecido"}
                      </small>
                    </div>
                    <div className='d-flex gap-2'>
                      <a
                        className='btn btn-outline-secondary'
                        href={`/course/${courseId}/task/${t.id}`}
                      >
                        Ver detalles
                      </a>
                      <a
                        className='btn btn-outline-primary'
                        href={`/course/${courseId}#tasks`}
                      >
                        Ver como alumno
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "view" && (
          <section className='teacher-section'>
            <h3>Ver tareas</h3>
            <p className='muted'>
              Listado público de tareas que verán los alumnos. Usa "Ir al curso"
              para navegar como alumno.
            </p>
            <div className='teacher-tasks-list'>
              {tasks.length === 0 && <p>No hay tareas publicadas.</p>}
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className='task-card card d-flex align-items-center justify-content-between mb-3'
                >
                  <div className='card-body'>
                    <h5>{t.title}</h5>
                    <p className='muted'>{t.description}</p>
                    <small className='muted'>
                      Vence:{" "}
                      {t.dueDateTime
                        ? new Date(t.dueDateTime).toLocaleString()
                        : t.dueDate || "No establecido"}
                    </small>
                  </div>
                  <div className='pe-3'>
                    <a
                      className='btn btn-outline-primary'
                      href={`/course/${courseId}#tasks`}
                    >
                      Ver como alumno
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "forum" && (
          <section className='teacher-section'>
            <h3>Foro de consultas</h3>
            <p>
              Sección para que los alumnos realicen consultas y el docente
              responda.
            </p>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <div className='muted'>Listado de foros del foro.</div>
              <div>
                {!showForumForm && (
                  <button
                    className='btn btn-sm btn-outline-success'
                    onClick={() => setShowForumForm(true)}
                  >
                    Crear foro
                  </button>
                )}
              </div>
            </div>

            {showForumForm && (
              <form onSubmit={handleForumFormSubmit} className='mb-3'>
                <input
                  className='form-control mb-1'
                  placeholder='Título del foro'
                  value={forumFormTitle}
                  onChange={(e) => setForumFormTitle(e.target.value)}
                />
                <textarea
                  className='form-control mb-1'
                  placeholder='Mensaje inicial'
                  value={forumFormMessage}
                  onChange={(e) => setForumFormMessage(e.target.value)}
                />
                <div className='d-flex gap-2 mt-1'>
                  <button className='btn btn-sm btn-success' type='submit'>
                    Crear foro
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm btn-outline-secondary'
                    onClick={() => {
                      setShowForumForm(false);
                      setForumFormTitle("");
                      setForumFormMessage("");
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <div className='forum-list'>
              {forumThreads.length === 0 && <p>No hay foros publicados.</p>}
              {forumThreads.map((h) => (
                <div key={h.id} className='card mb-2'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-start'>
                      <div>
                        <h5>{h.title}</h5>
                        <p className='muted'>{h.message}</p>
                        <small className='muted'>
                          Creado:{" "}
                          {h.date ? new Date(h.date).toLocaleString() : ""}
                        </small>
                      </div>
                      <div>
                        <button
                          className='btn btn-sm btn-outline-primary'
                          onClick={() => toggleThread(h.id)}
                        >
                          {expandedThreads.includes(h.id)
                            ? "Cerrar"
                            : "Ver foro"}
                        </button>
                      </div>
                    </div>

                    {expandedThreads.includes(h.id) && (
                      <div className='mt-3 thread-detail'>
                        <div className='posts-list mb-2'>
                          {(h.posts || []).length === 0 && (
                            <div className='muted'>No hay respuestas aún.</div>
                          )}
                          {(h.posts || []).map((p) => (
                            <div key={p.id} className='card p-2 mb-1'>
                              <div>
                                <strong>{p.author}</strong>{" "}
                                <small className='muted'>
                                  {p.date
                                    ? new Date(p.date).toLocaleString()
                                    : ""}
                                </small>
                              </div>
                              <div>{p.message}</div>
                            </div>
                          ))}
                        </div>

                        <div className='comment-form'>
                          <textarea
                            className='form-control mb-1'
                            placeholder='Escribir respuesta...'
                            value={commentInputs[h.id] || ""}
                            onChange={(e) =>
                              setCommentForThread(h.id, e.target.value)
                            }
                          />
                          <div className='d-flex gap-2'>
                            <button
                              className='btn btn-sm btn-primary'
                              onClick={() => submitComment(h.id)}
                            >
                              Responder
                            </button>
                            <button
                              className='btn btn-sm btn-outline-secondary'
                              onClick={() => {
                                setCommentForThread(h.id, "");
                                setExpandedThreads((prev) =>
                                  prev.filter((id) => id !== h.id)
                                );
                              }}
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "announcements" && (
          <section className='teacher-section'>
            <h3>Anuncios</h3>
            <p className='muted'>
              Área para publicar anuncios del curso. (Plantilla simple por
              ahora.)
            </p>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <div className='muted'>Anuncios del curso.</div>
              <div>
                {!showAnnouncementForm && (
                  <button
                    className='btn btn-sm btn-outline-warning'
                    onClick={() => setShowAnnouncementForm(true)}
                  >
                    Crear anuncio
                  </button>
                )}
              </div>
            </div>

            {showAnnouncementForm && (
              <form onSubmit={handleAnnouncementFormSubmit} className='mb-3'>
                <input
                  className='form-control mb-1'
                  placeholder='Título del anuncio'
                  value={announcementTitleInput}
                  onChange={(e) => setAnnouncementTitleInput(e.target.value)}
                />
                <textarea
                  className='form-control mb-1'
                  placeholder='Mensaje del anuncio'
                  value={announcementMessageInput}
                  onChange={(e) => setAnnouncementMessageInput(e.target.value)}
                />
                <div className='d-flex gap-2 mt-1'>
                  <button className='btn btn-sm btn-warning' type='submit'>
                    Publicar anuncio
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm btn-outline-secondary'
                    onClick={() => {
                      setShowAnnouncementForm(false);
                      setAnnouncementTitleInput("");
                      setAnnouncementMessageInput("");
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <div className='announcements-list'>
              {announcements.length === 0 && (
                <div className='card p-3'>
                  <p>No hay anuncios publicados.</p>
                </div>
              )}
              {announcements.map((a) => (
                <div key={a.id} className='card mb-2'>
                  <div className='card-body'>
                    <h5>{a.title}</h5>
                    <p className='muted'>{a.message}</p>
                    <small className='muted'>
                      Publicado:{" "}
                      {a.date ? new Date(a.date).toLocaleString() : ""}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
