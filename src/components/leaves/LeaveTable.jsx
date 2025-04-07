import React, { useEffect, useState } from 'react';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const LeaveTable = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('https://sems-backend.onrender.com/api/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name, 
                    days:
                        new Date(leave.startDate).getDate() -
                        new Date(leave.endDate).getDate(),
                    status: leave.status,
                    action: (<LeaveButtons Id={leave._id} />)
                }));
                
                setLeaves(data);
                setFilteredLeaves(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterByInput = (e) => {
        const data = leaves.filter(leave =>
            leave.employeeId
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
        setFilteredLeaves(data);
    };

    const filterByButton = (status) => {
        const data = leaves.filter(leave =>
            leave.status
            .toLowerCase()
            .includes(status.toLowerCase())
        );
        setFilteredLeaves(data);
    };

    return (
        <>
            {filteredLeaves.length > 0 ? (
                <div className="p-6">
                    <div className="text-center text-gray-800 mt-6">
                        <h3 className="text-2xl font-bold">Manage Leaves</h3>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
                        <input
                            type="text"
                            placeholder="Search by Emp ID"
                            className="px-4 py-2 rounded-md text-gray-800 border w-full md:w-auto"
                            onChange={filterByInput}
                        />
                        <div className="flex space-x-3 mt-4 md:mt-0">
                            <button
                                className="px-4 py-2 bg-yellow-700 text-white hover:bg-yellow-500 rounded-md"
                                onClick={() => filterByButton("Pending")}
                            >
                                Pending
                            </button>

                            <button
                                className="px-4 py-2 bg-green-700 text-white hover:bg-green-500 rounded-md"
                                onClick={() => filterByButton("Approved")}
                            >
                                Approved
                            </button>

                            <button
                                className="px-4 py-2 bg-red-800 text-white hover:bg-red-500 rounded-md"
                                onClick={() => filterByButton("Rejected")}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <DataTable columns={columns} data={filteredLeaves} pagination />
                    </div>
                </div>
            ) : (
                <div className="text-center mt-10">Loading...</div>
            )}
        </>
    );
};

export default LeaveTable;
