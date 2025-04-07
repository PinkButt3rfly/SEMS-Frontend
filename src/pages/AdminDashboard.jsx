import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div
        className={`md:w-64 w-full bg-gray-800 text-white fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}
      >
        <AdminSidebar />
      </div>

      
      <div
        className={`flex-1 h-screen bg-gray-200 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64 ml-0' : ''}`}
      >
        <Navbar setSidebarOpen={setSidebarOpen} /> 
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
