import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './coursedetail.css';
import WeekItem from './WeekItem.jsx';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar cursos
  useEffect(() => {
    fetch("http://localhost:8080/curso")
      .then(res => res.ok ? res.json() : Promise.reject('Error al cargar cursos'))
      .then(data => {
        const formatted = data.map(c => ({
          id: c.idCurso,
          title: c.nombre
        }));
        setCourses(formatted);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // Cargar mensajes
  useEffect(() => {
    fetch("http://localhost:8080/mensajes")
      .then(res => res.ok ? res.json() : Promise.reject('Error al cargar mensajes'))
      .then(data => setMensajes(data))
      .catch(err => console.error(err));
  }, []);

  if (loading) return <p>Cargando curso...</p>;
  if (error) return <p>Error: {error}</p>;

  const course = courses.find(c => String(c.id) === String(id)) || { id, title: 'Curso no encontrado' };

  // Semanas de ejemplo
  const weeks = Array.from({ length: 18 }, (_, i) => {
    const semanaNum = i + 1;
    // Filtrar los mensajes de esta semana y curso
    const mensajesSemana = mensajes.filter(
      m => m.idCurso === course.id && m.semana === semanaNum
    );
    return {
      id: semanaNum,
      title: `Semana ${semanaNum}`,
      content: `Contenido de la semana ${semanaNum}.`,
      mensajes: mensajesSemana // simplemente los añadimos aquí
    };
  });

  return (
    <div className="course-detail-container">
      <div className="course-header">
        <button className="btn btn-link back-btn" onClick={() => navigate(-1)}>◀ Volver</button>
        <h2>{course.title}</h2>
        <p className="muted">Total de semanas ({weeks.length})</p>
      </div>

      <div className="accordion" id="weeksAccordion">
        {weeks.map(w => (
          <WeekItem key={w.id} week={w} parentId="weeksAccordion" />
        ))}
      </div>
    </div>
  );
}
