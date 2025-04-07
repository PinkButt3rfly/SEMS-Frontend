import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Summary = () => {
    const { user } = useAuth();

    return (
        <div className="rounded-md p-6 flex bg-white shadow-md w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg">
            
            <div className="text-2xl flex justify-center items-center bg-pink-600 text-white px-4 rounded-md w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <FaUser />
            </div>
            
            
            <div className="pl-4 py-1">
                <p className="text-md font-semibold text-gray-500">Welcome Back</p>
                <p className="text-lg text-gray-800 font-semibold">{user.name}</p>
            </div>
        </div>
    );
};

export default Summary;
