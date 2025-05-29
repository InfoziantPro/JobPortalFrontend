import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmail from './pages/VerifyEmail';
import PostJob from './pages/PostJob';
import JobList from './components/JobList';
import ApproveRequests from './pages/ApproveRequests';
import VerifySuccess from './pages/VerifySuccess';
import VerifyFailed from './pages/VerifyFailed';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // user state to track logged in user info
  const [user, setUser] = useState(null);

  // on app mount, get user info from localStorage (if any)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // logout handler clears user state and localStorage
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // after login (in your Login page), you must call setUser with user data and save to localStorage!

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/all" element={<JobList />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/verify-failed" element={<VerifyFailed />} />
          <Route path="/register/candidate" element={<Register role="candidate" />} />
          <Route path="/register/company" element={<Register role="admin" />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postjob"
            element={
              <ProtectedRoute roles={['superadmin', 'employee']}>
                <PostJob />
              </ProtectedRoute>
            }
          />
           <Route
            path="/create-employee"
            element={
              <ProtectedRoute roles={['admin']}>
                <CreateEmployee />
              </ProtectedRoute>
            }
          />

           <Route
            path="/view-employees"
            element={
              <ProtectedRoute roles={['admin', 'superadmin']}>
                <EmployeeList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/approvals"
            element={
              <ProtectedRoute user={user} roles={['superadmin']}>
                <ApproveRequests />
              </ProtectedRoute>
            }
          />
          {/* Add PostJob page route if you have one */}
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
