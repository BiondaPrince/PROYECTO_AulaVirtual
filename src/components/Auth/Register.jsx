import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'

export default function Register() {
    const [showPwd, setShowPwd] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <div className="auth-page auth-center">
            <div className="auth-panel">
                <div className="auth-brand"><img src="https://i.ibb.co/V01j5DNM/rect1.png" alt="MARCUS+Class logo" /></div>
                <h1 className="auth-title">Crea tu cuenta</h1>
                <p className="auth-sub">Regístrate para acceder a tus cursos y contenidos</p>

                <form onSubmit={handleSubmit} className="auth-form-right">
                    <label className="field">
                        <div className="field-label">Nombre completo</div>
                        <input type="text" name="name" placeholder="Ingresa tu nombre" />
                    </label>

                    <label className="field">
                        <div className="field-label">Correo</div>
                        <input type="email" name="email" placeholder="Ingresa tu correo" />
                    </label>

                    <label className="field">
                        <div className="field-label">Contraseña</div>
                        <div className="pwd-row">
                            <input type={showPwd ? 'text' : 'password'} name="password" placeholder="Crear contraseña" />
                            <button type="button" className="pwd-toggle" onClick={() => setShowPwd(s => !s)} aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                                <span className="material-icons-outlined">{showPwd ? 'visibility_off' : 'visibility'}</span>
                            </button>
                        </div>
                    </label>

                    <button type="submit" className="btn btn-primary">Crear cuenta</button>
                </form>

                <p className="auth-footer">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
        </div>
    )
}
