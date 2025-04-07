import React from 'react'
import { useAuth } from '../../context/authContext'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <div className="flex items-center justify-between h-12 bg-pink-600 text-white px-4">
      
      <p className="flex-1 text-center sm:text-left">Welcome {user.name}</p>

      
      <button 
        className="px-4 py-1 bg-gray-800 rounded-md hover:bg-pink-800 mr-6"
        onClick={logout}
      >
        Logout
      </button>

      
      <div className="text-xl">
        <FaUserCircle />
      </div>
    </div>
  )
}

export default Navbar
