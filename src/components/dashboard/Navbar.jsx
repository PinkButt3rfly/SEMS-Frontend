import React from 'react'
import { FaBars } from 'react-icons/fa' // Add hamburger icon

const Navbar = ({ setSidebarOpen }) => {
  return (
    <div className="flex items-center justify-between h-12 bg-pink-600 text-white px-4">
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden text-white"
        onClick={() => setSidebarOpen((prev) => !prev)} // Toggle the sidebar
      >
        <FaBars />
      </button>

      {/* Welcome message */}
      <p className="flex-1 text-center">Welcome Admin</p>

      {/* Logout button */}
      <button className="px-4 py-1 bg-gray-800 rounded-md hover:bg-pink-800 mr-6">Logout</button>
    </div>
  )
}

export default Navbar
