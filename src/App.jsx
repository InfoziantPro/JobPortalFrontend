import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import JobForm from './components/JobForm';
import Navbar from './components/NavBar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/postjob" element={<JobForm />} />
          <Route path="*" element={<div className="p-4">Welcome! Please <a href="/login" className="text-blue-600 underline">login</a>.</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
