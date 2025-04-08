import React, { useState } from 'react';
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar state to toggle visibility

  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      {/* Sidebar */}
      <div
        className={`md:w-64 w-full bg-gray-800 text-white fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-50 md:relative`} // Sidebar toggle
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 h-screen bg-gray-200 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : ''
        }`} // Shift content when sidebar is open
      >
        <Navbar setSidebarOpen={setSidebarOpen} /> {/* Pass the function to Navbar */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
