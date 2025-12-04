import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
const API_URL = "http://localhost:8080/auth/";

export function AuthProviderWrapper({ children }) {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken ? JSON.parse(storedToken) : null;
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isProfesor, setIsProfesor] = useState(() => {
        const storedRole = localStorage.getItem("isProfesor");
        return storedRole ? JSON.parse(storedRole) : null;
    });

    const login = async (data) => {
        try {
            const response = await fetch(`${API_URL}login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error("Error en el login");
                return false;
            }

            const result = await response.json();
            setToken(result);
            localStorage.setItem("token", JSON.stringify(result));

            try {
                // Intentar decodificar el token dinámicamente (evita fallos si la dependencia no está instalada)
                try {
                    const jwtModule = await import('jwt-decode')
                    const jwtDecode = jwtModule && jwtModule.default ? jwtModule.default : jwtModule
                    const decoded = jwtDecode(result.token)

                    setUser(decoded)
                    setIsProfesor(decoded.role === 'PROFESOR')

                    localStorage.setItem('user', JSON.stringify(decoded))
                    localStorage.setItem('isProfesor', JSON.stringify(decoded.role === 'PROFESOR'))
                } catch (innerErr) {
                    // Si no se puede decodificar, guardar el token bruto como user por compatibilidad
                    console.warn('jwt-decode no disponible, guardando token sin decodificar', innerErr)
                    setUser({ token: result.token })
                    setIsProfesor(false)
                    localStorage.setItem('user', JSON.stringify({ token: result.token }))
                    localStorage.setItem('isProfesor', JSON.stringify(false))
                }
            } catch (e) {
                console.error('Error al procesar token:', e)
            }

            return true;
        } catch (e) {
            console.error("Error al iniciar sesion: ", e);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsProfesor(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isProfesor");
    };

    return (
        <AuthContext.Provider value={{ token, user, isProfesor, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}