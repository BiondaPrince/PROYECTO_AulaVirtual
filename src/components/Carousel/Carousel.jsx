import React from "react";
import "./carousel.css";

const Carousel = () => {
  return (
    <div className="my-carousel-container">
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicadores */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
          ></button>
          <button
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="src/assets/imagenes_carrusel/carrusel01.png"
              className="d-block w-100 carousel-img"
              alt="Banner 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="src/assets/imagenes_carrusel/carrusel02.png"
              className="d-block w-100 carousel-img"
              alt="Banner 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="src/assets/imagenes_carrusel/carrusel03.png"
              className="d-block w-100 carousel-img"
              alt="Banner 3"
            />
          </div>
        </div>

        {/* Controles (flechas) */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
