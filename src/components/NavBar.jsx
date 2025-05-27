import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-xl">Job Portal</Link>
      </div>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/jobs/all">Job Listings</Link>

            {(user.role === 'admin' || user.role === 'superadmin') && (
              <Link to="/postjob">Post Job</Link>
            )}

            <button
              onClick={handleLogoutClick}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
