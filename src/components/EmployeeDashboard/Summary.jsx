import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'


const Summary = () => {
    const {user} = useAuth()
  return (
    <div className="rounded-md p-6 flex bg-white">
        <div className={`text-2xl flex justify-center items-center bg-pink-600 text-white px-4 rounded-md`}>
            <FaUser />
        </div>
        <div className="pl-4 py-1">
            <p className="text-md font-lightbold">Welcome Back</p>
            <p className="text-lg text-gray-800 font-semibold">{user.name}</p>
        </div>
    </div>
  )
}

export default Summary
