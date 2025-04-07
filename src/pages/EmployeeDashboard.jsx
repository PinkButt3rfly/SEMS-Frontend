import React from 'react';
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      <div className="md:w-64 w-full bg-gray-800 text-white">
        <Sidebar />
      </div>

      
      <div className="flex-1 h-screen bg-gray-200">
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
