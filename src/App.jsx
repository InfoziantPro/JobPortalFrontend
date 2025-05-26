import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import JobForm from './components/JobForm';
import Navbar from './components/NavBar';
import JobsList from './components/JobList'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/postjob" element={<JobForm />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route
            path="*"
            element={
              <div className="p-4">
                Welcome! Please <a href="/login" className="text-blue-600 underline">Login</a> or{' '}
                <a href="/register" className="text-blue-600 underline">Register</a>.
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
