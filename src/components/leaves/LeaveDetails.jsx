import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeaveDetails = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/leave/details/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    setLeave(response.data.leave);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchLeave();
    }, []);

    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/leave/${id}`, {status}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <>
            {leave ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
                    
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        
                        
                        <div className="flex justify-center md:justify-start">
                            <img 
                                src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`} 
                                alt="profile"
                                className="w-72 rounded-full "
                            />
                        </div>

                        
                        <div >
                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Name:</p>
                                <p className="font-medium">{leave.employeeId.userId.name}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Employee ID:</p>
                                <p className="font-medium">{leave.employeeId.employeeId}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Leave Type:</p>
                                <p className="font-medium">{leave.leaveType}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Reason:</p>
                                <p className="font-medium">{leave.reason}</p>
                            </div>

                            <div className="flex space-x-3">
                                <p className="text-lg font-bold mb-2">Department:</p>
                                <p className="font-medium">{leave.employeeId.department.dep_name}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Start Date:</p>
                                <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">End Date:</p>
                                <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">
                                    {leave.status === "Pending" ? "Action:" : "Status:"}
                                </p>
                                {leave.status === "Pending" ? (
                                    <div className="flex space-x-2">
                                        <button 
                                        className="px-2 py-1 bg-green-700 text-white hover:bg-green-500 rounded-md"
                                        onClick={() => changeStatus(leave._id, "Approved")}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                        className="px-2 py-1 bg-red-700 text-white hover:bg-red-500 rounded-md"
                                        onClick={() => changeStatus(leave._id, "Rejected")}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) :
                                <p className="font-medium">{leave.status}</p>
                            } 
                                
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-10">Loading...</div>
            )}
        </>
    );
};

export default LeaveDetails;
