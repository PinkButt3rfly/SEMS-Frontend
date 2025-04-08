import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Summary = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex items-center w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
            
            <div className="text-xl sm:text-2xl flex justify-center items-center bg-pink-600 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <FaUser />
            </div>

            <div className="pl-4">
                <p className="text-sm sm:text-md font-semibold text-gray-500">Welcome Back</p>
                <p className="text-md sm:text-lg md:text-xl text-gray-800 font-semibold">{user.name}</p>
            </div>
        </div>
    );
};

export default Summary;
