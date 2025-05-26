import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="font-bold text-xl">
        <Link to="/">Job Portal</Link>
      </div>
      <div className="space-x-4">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/postjob" className="hover:underline">Post Job</Link>
      </div>
    </nav>
  );
};

export default Navbar;
