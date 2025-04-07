import React from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
     
      <AdminSidebar />

      <div className="flex-1 h-screen bg-gray-200">
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
