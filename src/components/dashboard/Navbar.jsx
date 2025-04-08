import React from 'react'
import { FaBars } from 'react-icons/fa' 
import { useAuth } from '../../context/authContext'

const Navbar = ({ setSidebarOpen }) => {
  const {user, logout} = useAuth()
  return (
    <div className="flex items-center justify-between h-12 bg-pink-600 text-white">
      
      <button
        className="md:hidden text-white"
        onClick={() => setSidebarOpen((prev) => !prev)} 
      >
        <FaBars />
      </button>

      
      <button className="px-4 py-1 bg-gray-800 rounded-md hover:bg-pink-800 mr-6"
      onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
