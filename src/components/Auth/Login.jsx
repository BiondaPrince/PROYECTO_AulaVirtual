import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'

export default function Login(){
  const [showPwd, setShowPwd] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
  }

  return (
    <div className="auth-page auth-center">
      <div className="auth-panel">
        <div className="auth-brand"><img src="https://i.ibb.co/V01j5DNM/rect1.png" alt="MARCUS+Class logo" /></div>
        <h1 className="auth-title">La nueva experiencia digital de aprendizaje</h1>
        <p className="auth-sub">Cercana, dinámica y flexible</p>

        <div className="auth-instructions">Ingresa tus datos para <strong>iniciar sesión</strong>.</div>

        <form onSubmit={handleSubmit} className="auth-form-right">
          <label className="field">
            <div className="field-label">Código MARCUS</div>
            <input type="text" name="username" placeholder="Ingresa tu usuario" />
            <div className="field-help">Ejemplo de usuario: M1533148</div>
          </label>

          <label className="field">
            <div className="field-label">Contraseña</div>
            <div className="pwd-row">
              <input type={showPwd ? 'text' : 'password'} name="password" placeholder="Ingresa tu contraseña" />
              <button type="button" className="pwd-toggle" onClick={() => setShowPwd(s => !s)} aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                <span className="material-icons-outlined">{showPwd ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </label>

          <div className="auth-actions">
            <Link to="#" className="link-reset">Restablecer contraseña</Link>
          </div>

          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>

        <p className="auth-footer">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  )
}
