import React, { useState } from 'react';
import { FiUser, FiBriefcase, FiBell, FiMessageCircle, FiHeart, FiFileText, FiUsers, FiHelpCircle, FiLock, FiLogOut, FiTrash2 } from 'react-icons/fi';

import JobList from '../components/JobList';


const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="p-4">Welcome to the Dashboard</div>;
      case 'profile':
        return <div className="p-4">Profile Component</div>;
      case 'resume':
        return <div className="p-4">Resume Component</div>;
      case 'applied':
        return <div className="p-4">Applied Jobs Component</div>;
      case 'alerts':
        return <JobList route="/jobs/all" />;
      case 'messages':
        return <div className="p-4">Messages Component</div>;
      case 'shortlisted':
        return <div className="p-4">Shortlisted Jobs Component</div>;
      case 'cv':
        return <div className="p-4">CV Manager Component</div>;
      case 'sme':
        return <div className="p-4">SME Connect Component</div>;
      case 'support':
        return <div className="p-4">Support Component</div>;
      case 'password':
        return <div className="p-4">Change Password Component</div>;
      case 'logout':
        return <div className="p-4">Logging Out...</div>;
      case 'delete':
        return <div className="p-4">Delete Profile Component</div>;
      default:
        return <div className="p-4">Welcome to the Dashboard</div>;
    }
  };

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <FiBriefcase /> },
    { key: 'profile', label: 'My Profile', icon: <FiUser /> },
    { key: 'resume', label: 'My Resume', icon: <FiFileText /> },
    { key: 'applied', label: 'Applied Jobs', icon: <FiBriefcase /> },
    { key: 'alerts', label: 'Job Alerts', icon: <FiBell /> },
    { key: 'messages', label: 'Messages', icon: <FiMessageCircle /> },
    { key: 'shortlisted', label: 'Shortlisted Jobs', icon: <FiHeart /> },
    { key: 'cv', label: 'CV Manager', icon: <FiFileText /> },
    { key: 'sme', label: 'SME Connect', icon: <FiUsers /> },
    { key: 'support', label: 'Support', icon: <FiHelpCircle /> },
    { key: 'password', label: 'Change Password', icon: <FiLock /> },
    { key: 'logout', label: 'Logout', icon: <FiLogOut /> },
    { key: 'delete', label: 'Delete Profile', icon: <FiTrash2 /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-md p-4">
        <ul className="space-y-2">
          {menuItems.map(({ key, label, icon }) => (
            <li
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md hover:bg-purple-100 transition ${
                activeTab === key ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-sm m-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
