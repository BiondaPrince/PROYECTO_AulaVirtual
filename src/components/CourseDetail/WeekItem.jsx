import React from 'react'

export default function WeekItem({ week, parentId }) {
  const collapseId = `collapse${week.id}`
  const headingId = `heading${week.id}`

  return (
    <div className="card week-card" key={week.id}>
      <div className="card-header" id={headingId}>
        <h2 className="mb-0">
          <button
            className="btn btn-link week-toggle d-flex justify-content-between align-items-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-expanded="false"
            aria-controls={collapseId}
          >
            <span>{week.title}</span>
            <span className="chev">▾</span>
          </button>
        </h2>
      </div>

      <div id={collapseId} className="collapse" aria-labelledby={headingId} data-bs-parent={`#${parentId}`}>
        <div className="card-body">
          <p className="week-content">{week.content}</p>
        </div>
      </div>
    </div>
  )
}
