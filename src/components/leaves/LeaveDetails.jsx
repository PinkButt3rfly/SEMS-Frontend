import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeaveDetails = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`https://sems-backend.onrender.com/api/leave/details/${id}`, {
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
    }, [id]);

    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(`https://sems-backend.onrender.com/api/leave/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                navigate('/admin-dashboard/leaves');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    const Info = ({ label, value }) => (
        <div className="flex gap-2 flex-wrap">
            <p className="text-base font-semibold">{label}:</p>
            <p className="text-base">{value}</p>
        </div>
    );

    return (
        <>
            {leave ? (
                <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 sm:p-10 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            {/* Profile Image */}
                            <div className="flex justify-center lg:justify-start">
                                <img 
                                    src={`https://sems-backend.onrender.com/${leave.employeeId.userId.profileImage}`} 
                                    alt="profile"
                                    className="w-48 sm:w-60 md:w-72 rounded-full object-cover"
                                />
                            </div>

                            {/* Leave Info */}
                            <div className="space-y-3">
                                <Info label="Name" value={leave.employeeId.userId.name} />
                                <Info label="Employee ID" value={leave.employeeId.employeeId} />
                                <Info label="Leave Type" value={leave.leaveType} />
                                <Info label="Reason" value={leave.reason} />
                                <Info label="Department" value={leave.employeeId.department.dep_name} />
                                <Info label="Start Date" value={new Date(leave.startDate).toLocaleDateString()} />
                                <Info label="End Date" value={new Date(leave.endDate).toLocaleDateString()} />

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <p className="text-lg font-bold">{leave.status === "Pending" ? "Action:" : "Status:"}</p>
                                    {leave.status === "Pending" ? (
                                        <div className="flex gap-3">
                                            <button 
                                                className="px-3 py-1 bg-green-700 text-white hover:bg-green-600 rounded-md text-sm"
                                                onClick={() => changeStatus(leave._id, "Approved")}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                className="px-3 py-1 bg-red-700 text-white hover:bg-red-600 rounded-md text-sm"
                                                onClick={() => changeStatus(leave._id, "Rejected")}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="font-medium text-sm">{leave.status}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-10 text-center">Loading...</div>
            )}
        </>
    );
};

export default LeaveDetails;
