import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch current user on mount to persist login state
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiClient.get('/me');  // backend route that returns current user info if cookie valid
        setUser(response.data.user || response.data);
      } catch {
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      const extractedUser = response.data.user || response.data;
      setUser({ name: extractedUser.name || 'Guest', role: extractedUser.role || 'user' });
    } catch (err) {
      throw err;
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
