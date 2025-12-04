import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

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

      if (!response.ok) return { success: false };

      const result = await response.json();

      // Guardar token
      setToken(result);
      localStorage.setItem("token", JSON.stringify(result));

      // Decodificar token
      const decoded = jwtDecode(result.token);

      // CORRECCIÓN: usar "rol" en vez de "role"
      const esProfesor = decoded.rol === "PROFESOR";

      // Guardar usuario y rol
      setUser(decoded);
      setIsProfesor(esProfesor);

      localStorage.setItem("user", JSON.stringify(decoded));
      localStorage.setItem("isProfesor", JSON.stringify(esProfesor));

      return { success: true, isProfesor: esProfesor };
    } catch (e) {
      return { success: false };
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
