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

      if (!response.ok) {
        console.error("Error en el login");
        return false;
      }

      const result = await response.json();
      setToken(result);
      localStorage.setItem("token", JSON.stringify(result));

      try {
        const decoded = jwtDecode(result.token);

        setUser(decoded);
        setIsProfesor(decoded.role === "PROFESOR");

        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem(
          "isProfesor",
          JSON.stringify(decoded.role === "PROFESOR")
        );
      } catch (e) {
        console.error("Error al decodificar token:", e);
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
