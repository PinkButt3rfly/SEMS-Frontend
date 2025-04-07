import React, { useState } from 'react';
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
  // State to toggle sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar for larger screens */}
      <div className={`fixed inset-0 z-10 md:hidden bg-black bg-opacity-50 ${sidebarOpen ? "block" : "hidden"}`} 
           onClick={() => setSidebarOpen(false)}></div>
      <Sidebar className={`fixed md:relative md:block ${sidebarOpen ? "block" : "hidden md:block"}`} />
      
      {/* Content area */}
      <div className="flex-1 ml-0 md:ml-64 h-screen bg-gray-200">
        {/* Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Outlet to render nested routes */}
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
