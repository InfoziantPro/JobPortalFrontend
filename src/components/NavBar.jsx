import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { role, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>Job Portal</div>
      <div>
        {role ? (
          <>
            <span className="mr-4">Role: {role}</span>
            <button onClick={logout} className="underline">Logout</button>
          </>
        ) : (
          <span>Please log in</span>
        )}
      </div>
    </nav>
  );
}
