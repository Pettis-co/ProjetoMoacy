import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1]; // Pega a parte do payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeJWT(token);
      console.log(decoded)
      const firstName = decoded?.given_name || 'Usuário';
      const picture = decoded?.picture || 'Usuário'; // Ajuste conforme a estrutura do seu token
      return { token, firstName, picture };
    }
    return null;
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = decodeJWT(token)
    const firstName = decoded?.given_name || 'Usuário';
    setUser({ token, firstName });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);