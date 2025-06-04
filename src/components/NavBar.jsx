import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaBars, FaBell } from 'react-icons/fa';
import logo from '/src/assets/logos/Logo.png';
import apiClient from '../api/apiClient';

export default function Navbar({ user, onLogout }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const userMenuRef = useRef();
  const mainMenuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = async () => {
    try {
      await apiClient.post('/logout');
      if (onLogout) onLogout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (mainMenuRef.current && !mainMenuRef.current.contains(event.target)) {
        setMainMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatRole = (role) => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white p-4 flex justify-between items-center border-b-2 border-gray-200 shadow-lg font-jost">
      {/* Logo */}
      <div>
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Company Logo" className="h-10 w-auto object-contain" />
        </Link>
      </div>

      {/* Center Navigation - Hidden on mobile */}
      <div className="hidden md:flex space-x-6 text-gray-700 text-md font-normal">
        <Link to="/" className={`hover:text-indigo-800 ${isActive('/') ? 'font-bold text-indigo-800' : ''}`}>Home</Link>
        <Link to="/about" className={`hover:text-indigo-800 ${isActive('/about') ? 'font-bold text-indigo-800' : ''}`}>About</Link>
        <Link to="/all-jobs" className={`hover:text-indigo-800 ${isActive('/all-jobs') ? 'font-bold text-indigo-800' : ''}`}>Jobs</Link>
        <Link to="/companies" className={`hover:text-indigo-800 ${isActive('/companies') ? 'font-bold text-indigo-800' : ''}`}>Companies</Link>
        <Link to="/courses" className={`hover:text-indigo-800 ${isActive('/courses') ? 'font-bold text-indigo-800' : ''}`}>Courses</Link>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        {/* Hamburger - Mobile Only */}
        <div className="md:hidden relative" ref={mainMenuRef}>
          <button
            onClick={() => setMainMenuOpen((prev) => !prev)}
            className="text-gray-800 text-2xl"
          >
            <FaBars />
          </button>
          {mainMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-44 z-10 border font-jost">
              <div className="flex flex-col text-sm text-gray-700 p-2 space-y-1">
                <Link to="/" className={`hover:bg-gray-100 px-2 py-1 rounded ${isActive('/') ? 'font-bold text-indigo-800' : ''}`}>Home</Link>
                <Link to="/about" className={`hover:bg-gray-100 px-2 py-1 rounded ${isActive('/about') ? 'font-bold text-indigo-800' : ''}`}>About</Link>
                <Link to="/all-jobs" className={`hover:bg-gray-100 px-2 py-1 rounded ${isActive('/all-jobs') ? 'font-bold text-indigo-800' : ''}`}>Jobs</Link>
                <Link to="/companies" className={`hover:bg-gray-100 px-2 py-1 rounded ${isActive('/companies') ? 'font-bold text-indigo-800' : ''}`}>Companies</Link>
                <Link to="/courses" className={`hover:bg-gray-100 px-2 py-1 rounded ${isActive('/courses') ? 'font-bold text-indigo-800' : ''}`}>Courses</Link>
              </div>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <button
          className="text-gray-800 text-2xl mb-1 relative"
          aria-label="Notifications"
        >
          <FaBell />
          {/* Optional red dot badge */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Icon */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-gray-800 text-2xl"
          >
            <FaUser />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-48 z-10 border">
              <div className="flex flex-col text-sm text-gray-700 p-2 space-y-1">
                {user ? (
                  <>
                    <div className="px-2 py-1">
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{formatRole(user.role)}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className={`hover:bg-gray-100 px-2 py-1 rounded ${isActive('/dashboard') ? 'font-bold text-indigo-800' : ''}`}
                    >
                      Dashboard
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogoutClick}
                      className="text-red-800 hover:bg-red-100 px-2 py-1 rounded text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={`hover:bg-gray-100 px-2 py-1 rounded ${isActive('/login') ? 'font-bold text-indigo-800' : ''}`}>Login</Link>
                    <Link to="/register" className={`hover:bg-gray-100 px-2 py-1 rounded ${isActive('/register') ? 'font-bold text-indigo-800' : ''}`}>Register</Link>
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
