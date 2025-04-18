import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://sems-backend.onrender.com/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchEmployee();
    }, [id]);

    return (
        <>
            {employee ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Profile Image Section */}
                        <div className="flex justify-center md:justify-start">
                            <img 
                                src={`https://sems-backend.onrender.com/${employee.userId.profileImage}`} 
                                alt="profile"
                                className="w-72 rounded-full object-cover"
                            />
                        </div>

                        {/* Employee Info Section */}
                        <div>
                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Name:</p>
                                <p className="font-medium">{employee.userId.name}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Employee ID:</p>
                                <p className="font-medium">{employee.employeeId}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Date of Birth:</p>
                                <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Gender:</p>
                                <p className="font-medium">{employee.gender || "Not Provided"}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Department:</p>
                                <p className="font-medium">{employee.department.dep_name}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Marital Status:</p>
                                <p className="font-medium">{employee.maritalStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-10">Loading...</div>
            )}
        </>
    );
};

export default View;
