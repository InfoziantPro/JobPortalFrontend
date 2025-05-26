import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">Job Portal</Link>
      </div>

      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="mr-4">Hi, {user.name}</span>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
            {user.role === 'admin' && (
              <Link to="/postjob" className="hover:underline">Post Job</Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
