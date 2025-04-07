import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      <div className="md:w-64 w-full bg-gray-800 text-white">
        <AdminSidebar />
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

export default AdminDashboard;
