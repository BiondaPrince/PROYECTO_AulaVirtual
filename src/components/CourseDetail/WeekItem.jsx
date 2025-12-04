import { useState, useEffect } from 'react';

export default function WeekItem({ week, parentId }) {
  const [newMensaje, setNewMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  // Cargar mensajes guardados en localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`mensajes_semana_${week.id}`)) || [];
    setMensajes(saved);
  }, [week.id]);

  // Enviar mensaje
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMensaje.trim()) return;

    const mensajeObj = {
      id: Date.now(),
      mensaje: newMensaje
    };

    const updated = [mensajeObj, ...mensajes]; // nuevo mensaje arriba
    setMensajes(updated);
    localStorage.setItem(`mensajes_semana_${week.id}`, JSON.stringify(updated));
    setNewMensaje('');
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${week.id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${week.id}`}
          aria-expanded="false"
          aria-controls={`collapse${week.id}`}
        >
          {week.title}
        </button>
      </h2>
      <div
        id={`collapse${week.id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${week.id}`}
        data-bs-parent={`#${parentId}`}
      >
        <div className="accordion-body">
          <p>{week.content}</p>

          {/* Formulario para nuevo mensaje */}
          <form onSubmit={handleSubmit} className="mensaje-form">
            <textarea
              value={newMensaje}
              onChange={(e) => setNewMensaje(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="mensaje-input"
            />
            <button type="submit" className="btn btn-primary btn-sm">Enviar</button>
          </form>

          {/* Lista de mensajes */}
          {mensajes.length > 0 && (
            <div className="mensajes-container">
              {mensajes.map((m) => (
                <div key={m.id} className="mensaje-card">
                  <p>{m.mensaje}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
