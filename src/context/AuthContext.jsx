import React, { createContext, useContext, useState } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/login', { email, password });

      // Ensure response contains role and name
      const { role, name } = response.data;

      setUser({ role, name });
    } catch (err) {
      console.error('Login failed:', err.response?.data?.error || err.message);
      throw err; // rethrow to handle in UI if needed
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/logout');
    } catch (err) {
      console.warn('Logout request failed:', err.message);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
