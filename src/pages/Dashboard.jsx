import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser, FiBriefcase, FiBell, FiMessageCircle, FiHeart, FiFileText, FiUsers,
  FiLock, FiLogOut, FiTrash2, FiMenu, FiX
} from 'react-icons/fi';
import apiClient from '../api/apiClient';

import JobList from '../components/JobList';


const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <p className="text-center mt-10 text-red-500 font-semibold">Please log in to access the dashboard.</p>;
  }

  const role = user?.role?.toLowerCase();

  const commonItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <FiBriefcase />, content: 'Welcome to the Dashboard' },
    { key: 'password', label: 'Change Password', icon: <FiLock />, content: 'Change Password Component' },
  ];

  const roleSpecificMenu = {
    candidate: [
      { key: 'profile', label: 'My Profile', icon: <FiUser />, content: 'My Profile Component' },
      { key: 'resume', label: 'My Resume', icon: <FiFileText />, content: 'Resume Component' },
      { key: 'applied', label: 'Applied Jobs', icon: <FiBriefcase />, content: 'Applied Jobs Component' },
      { key: 'alerts', label: 'Job Listing', icon: <FiBell />, content: <JobList route="/jobs/all" /> },
      { key: 'messages', label: 'Messages', icon: <FiMessageCircle />, content: 'Messages Component' },
      { key: 'shortlisted', label: 'Shortlisted Jobs', icon: <FiHeart />, content: 'Shortlisted Jobs Component' },
      { key: 'cv', label: 'CV Manager', icon: <FiFileText />, content: 'CV Manager Component' },
    ],
    admin: [
      { key: 'company', label: 'Company Profile', icon: <FiUser />, content: 'Company Profile Component' },
      { key: 'add', label: 'Add Employees', icon: <FiUsers />, content: 'Add Employee Component' },
      { key: 'manage', label: 'Manage Employees', icon: <FiUsers />, content: 'Manage Employees Component' },
      { key: 'jobs', label: 'Manage Jobs', icon: <FiBriefcase />, content: <JobList route="/jobs/all" /> },
      { key: 'applicants', label: 'All Applicants', icon: <FiUsers />, content: 'Applicants Component' },
      { key: 'shortlisted', label: 'Shortlisted Resumes', icon: <FiHeart />, content: 'Shortlisted Resumes Component' },
      { key: 'view', label: 'View Profile', icon: <FiUser />, content: 'View Profile Component' },
    ],
    superadmin: [
      { key: 'company', label: 'Company Profile', icon: <FiUser />, content: 'Company Profile Component' },
      { key: 'add', label: 'Add Employees', icon: <FiUsers />, content: 'Add Employee Component' },
      { key: 'manage', label: 'Manage Employees', icon: <FiUsers />, content: 'Manage Employees Component' },
      { key: 'jobs', label: 'Manage Jobs', icon: <FiBriefcase />, content: 'Manage Jobs Component' },
      { key: 'applicants', label: 'All Applicants', icon: <FiUsers />, content: 'Applicants Component' },
      { key: 'shortlisted', label: 'Shortlisted Resumes', icon: <FiHeart />, content: 'Shortlisted Resumes Component' },
      { key: 'view', label: 'View Profile', icon: <FiUser />, content: 'View Profile Component' },
    ],
    employee: [
      { key: 'employee-profile', label: 'Employee Profile', icon: <FiUser />, content: 'Employee Profile Component' },
      { key: 'post', label: 'Post a New Job', icon: <FiBriefcase />, content: 'Post Job Component' },
      { key: 'manage-jobs', label: 'Manage Jobs', icon: <FiBriefcase />, content: 'Manage Jobs Component' },
      { key: 'applicants', label: 'All Applicants', icon: <FiUsers />, content: 'Applicants Component' },
      { key: 'shortlisted', label: 'Shortlisted Resumes', icon: <FiHeart />, content: 'Shortlisted Component' },
      { key: 'view', label: 'View Profile', icon: <FiUser />, content: 'View Profile Component' },
      { key: 'delete', label: 'Delete Profile', icon: <FiTrash2 />, content: 'Delete Profile Component' },
    ]
  };

  const handleLogout = async () => {
    try {
      await apiClient.post('/logout');
      if (onLogout) onLogout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const menu = [
    ...commonItems,
    ...(roleSpecificMenu[role] || []),
    { key: 'logout', label: 'Logout', icon: <FiLogOut />, isLogout: true },
  ];

  const renderContent = () => {
    const current = menu.find(item => item.key === activeTab);
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-gray-50 rounded-lg p-6 min-h-[200px] text-gray-800 shadow-inner">
          {current?.content || 'Welcome to the Dashboard'}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow border-b px-4 py-3 flex items-center justify-between z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        <h1 className="text-lg font-semibold text-gray-900 ml-2 truncate">
          Welcome, {user.name}
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg w-72 z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:w-64 lg:w-72 md:shadow-md flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b bg-gradient-to-br from-indigo-600 to-blue-600 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">Your Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:bg-white/20 p-1 rounded transition"
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>
          <p className="text-indigo-100 text-sm mt-1 capitalize">{role} Portal</p>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {menu.map(({ key, label, icon, isLogout }) => (
              <li key={key}>
                <button
                  onClick={() => {
                    if (isLogout) {
                      handleLogout();
                    } else {
                      setActiveTab(key);
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition
                    ${activeTab === key && !isLogout
                      ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-300 shadow'
                      : isLogout
                        ? 'hover:bg-red-50 text-gray-600 hover:text-red-700'
                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-700'
                    }
                  `}
                >
                  <span className={`text-lg ${activeTab === key && !isLogout ? 'text-blue-700' : ''}`}>
                    {icon}
                  </span>
                  <span className="font-medium text-sm truncate">{label}</span>
                  {activeTab === key && !isLogout && (
                    <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Desktop Header */}
        <div className="hidden md:block bg-white shadow border-b px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-sm text-gray-600 mt-1 capitalize">{role} Dashboard</p>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white md:bg-gray-50 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-sm">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
