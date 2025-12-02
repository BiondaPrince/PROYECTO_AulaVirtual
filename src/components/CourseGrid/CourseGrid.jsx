import React, { useEffect, useState } from "react";
import "./coursegrid.css";

export default function CourseGrid() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/curso")
      .then((response) => response.json())
      .then((data) => {
        // Adaptar los datos para que encajen con tu estructura actual
        const formatted = data.map((c, index) => ({
          id: c.idCurso,
          title: c.nombre,
          code: c.idCurso, // Si quieres usar otro código, cámbialo
          mode: "Presencial", // Puedes eliminar esto si no lo necesitas
          progress: Math.floor(Math.random() * 100), // temporal, si no tienes progreso
          image: `src/assets/imagenes_carrusel/curso0${(index % 2) + 5}.jpg`
        }));
        setCourses(formatted);
      })
      .catch((error) => console.error("Error cargando cursos:", error));
  }, []);

  return (
    <div className="coursegrid-container">
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <div className="course-image-wrapper">
            <img src={course.image} alt={course.title} className="course-image" />
          </div>

          <div className="course-info">
            <div className="progress">{course.progress}%</div>
            <h3 className="course-title">{course.title}</h3>
            <p className="course-details">
              {course.code} · {course.mode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
