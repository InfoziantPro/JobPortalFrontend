import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBars } from 'react-icons/fa';
import logo from '/src/assets/logos/Logo.png'

export default function Navbar({ user, onLogout }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef();
  const mainMenuRef = useRef();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current && !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
      if (
        mainMenuRef.current && !mainMenuRef.current.contains(event.target)
      ) {
        setMainMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Company Logo" className="h-10 w-auto object-contain" />
          <span className="font-bold text-xl text-indigo-900">Job Portal</span>
  </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Hamburger Menu - only shown if user is logged in */}
        {user && (
          <div className="relative" ref={mainMenuRef}>
            <button
              onClick={() => setMainMenuOpen((prev) => !prev)}
              className="text-gray-800 text-2xl"
            >
              <FaBars />
            </button>

            {mainMenuOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-44 z-10 border">
            <div className="flex flex-col text-sm text-gray-700 p-2 space-y-1">
              <Link to="/" className="hover:bg-gray-100 px-2 py-1 rounded">Home</Link>
              
              {(user.role==="employee" || user.role==="candidate") && (
                <Link to="/jobs/all" className="hover:bg-gray-100 px-2 py-1 rounded">Job Listings</Link>
              )}

              {(user.role==="employee") && (
                <Link to="/postjob" className="hover:bg-gray-100 px-2 py-1 rounded">Post Job</Link>
              )}


              {/* ✅ Admin-only: Create & View Employees */}
              {user.role === 'admin' && (
                <>
                  <Link to="/create-employee" className="hover:bg-gray-100 px-2 py-1 rounded">Create Employee</Link>
                  <Link to="/view-employees" className="hover:bg-gray-100 px-2 py-1 rounded">View Employees</Link>
                </>
              )}

              {user.role === 'superadmin' && (
                <Link to="/approvals" className="hover:bg-gray-100 px-2 py-1 rounded">
                  Approve Requests
                </Link>
              )}
            </div>
          </div>
        )}

          </div>
        )}

        {/* User Icon Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-gray-800 text-2xl"
          >
            <FaUser />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-36 z-10 border">
              <div className="flex flex-col text-sm text-gray-700 p-2 space-y-1">
                {user ? (
                  <button
                    onClick={handleLogoutClick}
                    className="text-red-600 hover:bg-red-100 px-2 py-1 rounded text-left"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="hover:bg-gray-100 px-2 py-1 rounded">Login</Link>
                    <Link to="/register" className="hover:bg-gray-100 px-2 py-1 rounded">Register</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
