import React from 'react'

export default function StudentUpload({ courseId, taskId, storageKey }){
  const [uploaded, setUploaded] = React.useState([]) // already uploaded
  const [pending, setPending] = React.useState([])   // selected but not uploaded
  const inputRef = React.useRef(null)
  const key = storageKey || `submissions_${courseId}_${taskId}`

  React.useEffect(()=>{
    try{
      const raw = localStorage.getItem(key)
      setUploaded(raw ? JSON.parse(raw) : [])
    }catch(e){ setUploaded([]) }
  },[key])

  function handleSelect(e){
    const chosen = Array.from(e.target.files || [])
    // map to minimal object so we can show and remove before upload
    const newItems = chosen.map(f => ({ name: f.name, size: f.size }))
    setPending(prev => [...prev, ...newItems])
    // clear input to allow selecting same files again if needed
    if(inputRef.current) inputRef.current.value = null
  }

  function removePending(index){
    setPending(p => p.filter((_,i)=>i!==index))
  }

  function uploadPending(){
    if(pending.length === 0) return
    const now = new Date().toISOString()
    const newUploaded = [...pending.map(p => ({ name: p.name, date: now })), ...uploaded]
    setUploaded(newUploaded)
    localStorage.setItem(key, JSON.stringify(newUploaded))
    setPending([])
  }

  return (
    <div className="student-upload">
      <div className="d-flex gap-2 align-items-center">
        <label className="btn btn-outline-primary mb-0">
          Seleccionar archivos
          <input ref={inputRef} type="file" multiple onChange={handleSelect} style={{ display: 'none' }} />
        </label>
        <button className="btn btn-primary" disabled={pending.length===0} onClick={uploadPending}>Subir seleccionados</button>
      </div>

      {pending.length > 0 && (
        <div className="pending-list mt-2">
          <strong>Archivos pendientes:</strong>
          {pending.map((p,i) => (
            <div key={i} className="d-flex align-items-center justify-content-between card p-2 mb-1">
              <div>{p.name} <small className="muted">({Math.round(p.size/1024)} KB)</small></div>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>removePending(i)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3">
        {uploaded.map((f,i) => <div key={i} className="submission-item">{f.name} <small className="muted">({new Date(f.date).toLocaleString()})</small></div>)}
      </div>
    </div>
  )
}
