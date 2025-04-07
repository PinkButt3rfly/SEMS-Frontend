import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminMain from '../components/dashboard/AdminMain'
import { Outlet } from 'react-router-dom'



const AdminDashboard = () => {
  const {user} = useAuth()

 
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 h-screen bg-gray-200">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
