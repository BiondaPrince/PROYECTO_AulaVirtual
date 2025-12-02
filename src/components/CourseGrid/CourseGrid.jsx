import React from "react";
import { Link } from 'react-router-dom'
import "./coursegrid.css";

export default function CourseGrid() {
  const courses = [
    {
      id: 1,
      title: "Diseño de Patrones",
      code: "19412",
      mode: "Presencial",
      progress: 58,
      image: "src/assets/imagenes_carrusel/curso05.jpg" 
    },
    {
      id: 2,
      title: "Administración de Empresas",
      code: "30416",
      mode: "Presencial",
      progress: 29,
      image: " src/assets/imagenes_carrusel/curso06.jpg"
    },
    {
      id: 3,
      title: "Gestión de Proyectos",
      code: "37647",
      mode: "Virtual 24/7",
      progress: 30,
      image: "src/assets/imagenes_carrusel/curso05.jpg"
    },
    {
      id: 4,
      title: "Desarrollo Web Frontend",
      code: "22801",
      mode: "Híbrido",
      progress: 75,
      image: "src/assets/imagenes_carrusel/curso06.jpg"
    },
    {
      id: 5,
      title: "Bases de Datos SQL",
      code: "25634",
      mode: "Virtual 24/7",
      progress: 42,
      image: "src/assets/imagenes_carrusel/curso05.jpg"
    },
    {
      id: 6,
      title: "Ciberseguridad Aplicada",
      code: "31920",
      mode: "Presencial",
      progress: 65,
      image: "src/assets/imagenes_carrusel/curso06.jpg"
    }
  ];

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
