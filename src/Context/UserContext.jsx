import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const AuthUser = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  // Función para manejar el inicio de sesión y actualizar el estado user
  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, handleLogout, loading, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};
