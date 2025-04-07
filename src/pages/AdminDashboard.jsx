import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className={`flex-1 h-screen bg-gray-200 transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        
        <Navbar setSidebarOpen={setSidebarOpen} />

        
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
