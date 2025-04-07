import React from 'react';
import { useAuth } from '../../context/authContext';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-12 bg-pink-600 text-white px-4">
      
      <button
        className="md:hidden text-white"
        onClick={() => setSidebarOpen(prev => !prev)} 
      >
        <FaBars />
      </button>

      
      <p className="flex-1 text-center sm:text-left">Welcome {user.name}</p>

      
      <button
        className="px-4 py-1 bg-gray-800 rounded-md hover:bg-pink-800 mr-6"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
