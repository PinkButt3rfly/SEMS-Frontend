import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [isSidebarOpen, setSidebarOpen] = useState(false) 

  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      <div
        className={`fixed md:relative top-0 left-0 bottom-0 bg-gray-800 text-white h-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64 z-50`}
      >
        <AdminSidebar />
      </div>

      
      <div
        className={`flex-1 bg-gray-200 h-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : ''
        }`}
      >
        <Navbar setSidebarOpen={setSidebarOpen} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
