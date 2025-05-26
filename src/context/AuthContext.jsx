import React, { createContext, useContext, useState } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  const login = async (email, password) => {
    const response = await apiClient.post('/login', { email, password });
    setRole(response.data.role);
    // Token stored in HttpOnly cookie, no manual token handling here
  };

  const logout = async () => {
    await apiClient.post('/logout');
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
