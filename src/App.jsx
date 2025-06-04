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
import Companies from './pages/Companies';
import AboutMe from './pages/AboutMe';
import About from './pages/About';
import AllJobs from './components/AllJobs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

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


  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/verify-failed" element={<VerifyFailed />} />
          <Route path="/register/candidate" element={<Register role="candidate" />} />
          <Route path="/register/company" element={<Register role="admin" />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route path="/about" element={<About />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          
          <Route
            path="/jobs/all"
            element={
              <ProtectedRoute roles={['candidate', 'employee', 'admin']}>
                <JobList user={user} />
              </ProtectedRoute>
            }
          />
          
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

          <Route
            path="/postjob"
            element={
              <ProtectedRoute roles={['admin', 'employee']}>
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
            path="/view-companies"
            element={
              <ProtectedRoute roles={['superadmin']}>
                <Companies />
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
