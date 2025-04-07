import React from 'react'
import { useAuth } from '../../context/authContext'


const Navbar = () => {
    const { user, logout } = useAuth()
  return (
    <div className="flex items-center justify-between h-12 bg-pink-600 text-white">
        <p className="ml-6">Welcome {user.name}</p>
        <button 
          className="px-4 py-1 bg-gray-800 mr-6 rounded-md hover:bg-pink-800"
          onClick={(logout)}
          >
            Logout
        </button>
    </div>
  )
}

export default Navbar
