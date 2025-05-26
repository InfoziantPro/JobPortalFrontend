import React, { createContext, useContext, useState } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store entire user object

  const login = async (email, password) => {
    const response = await apiClient.post('/login', { email, password });
    setUser({ role: response.data.role, name: response.data.name }); // update with name
  };

  const logout = async () => {
    await apiClient.post('/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
