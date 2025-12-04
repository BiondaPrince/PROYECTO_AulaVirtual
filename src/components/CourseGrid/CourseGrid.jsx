import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./coursegrid.css";
import { AuthContext } from "../context/AuthContext";

export default function CourseGrid() {
  const [courses, setCourses] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;

    const sampleCourses = [
      {
        id: "sample-1",
        title: "Introducción a la Programación",
        code: "CS101",
        mode: "Online",
        progress: 35,
        image: "src/assets/imagenes_carrusel/curso05.jpg",
      },
      {
        id: "sample-2",
        title: "Matemáticas Discretas",
        code: "MATH201",
        mode: "Presencial",
        progress: 72,
        image: "src/assets/imagenes_carrusel/curso06.jpg",
      },
    ];

    async function load() {
      try {
        const headers = { "Content-Type": "application/json" };
        if (token && token.token) headers.Authorization = `Bearer ${token.token}`;

        const resp = await fetch("http://localhost:8080/curso", { headers });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();

        if (!mounted) return;

        const formatted = (data || []).map((c, index) => ({
          id: c.idCurso ?? c.id ?? `course-${index}`,
          title: c.nombre ?? c.title ?? "Sin título",
          code: c.idCurso ?? c.codigo ?? c.id ?? `C-${index}`,
          mode: c.modo ?? "Presencial",
          progress: Math.floor(Math.random() * 100),
          image:
            c.imagen || `src/assets/imagenes_carrusel/curso0${(index % 2) + 5}.jpg`,
        }));

        setCourses(formatted);
      } catch {
        // Backend no disponible: usar datos de ejemplo sin spam en consola
        if (mounted) setCourses(sampleCourses);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div className="coursegrid-container">
      {courses.map((course) => (
        <Link key={course.id} to={`/course/${course.id}`} className="course-card-link">
          <div className="course-card">
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
        </Link>
      ))}
    </div>
  );
}