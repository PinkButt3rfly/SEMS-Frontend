import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const List = () => {
    const [leaves, setLeaves] = useState([]);
    const { id } = useParams();
    const { user } = useAuth();
    let sno = 1;

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get(`https://sems-backend.onrender.com/api/leave/${id}/${user.role}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    setLeaves(response.data.leaves);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.message);
                }
            }
        };

        fetchLeaves();
    }, [id, user.role]);

    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Leaves</h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by Employee name"
                    className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3"
                />

                {user.role === "employee" && (
                    <Link
                        to="/employee-dashboard/add-leave"
                        className="px-4 py-2 bg-pink-600 text-white rounded-md text-center"
                    >
                        Add New Leave
                    </Link>
                )}
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full text-sm text-gray-700 table-auto border-collapse">
                    <thead className="bg-gray-100 text-xs uppercase border-b">
                        <tr>
                            <th className="px-3 py-2 text-left">SNO</th>
                            <th className="px-3 py-2 text-left">Leave Type</th>
                            <th className="px-3 py-2 text-left">From</th>
                            <th className="px-3 py-2 text-left">To</th>
                            <th className="px-3 py-2 text-left">Reason</th>
                            <th className="px-3 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave.id} className="bg-white border-b">
                                <td className="px-3 py-2">{sno++}</td>
                                <td className="px-3 py-2 break-words">{leave.leaveType}</td>
                                <td className="px-3 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td className="px-3 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td className="px-3 py-2 break-words">{leave.reason}</td>
                                <td className="px-3 py-2">{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
