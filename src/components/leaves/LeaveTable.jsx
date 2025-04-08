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
                        new Date(leave.endDate).getDate() -
                        new Date(leave.startDate).getDate(),
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

    const customStyles = {
        table: {
            style: {
                width: '100%',
                fontSize: '12px',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#f3f4f6',
                fontSize: '12px',
            },
        },
        rows: {
            style: {
                fontSize: '11px',
                wordBreak: 'break-word',
            },
        },
        cells: {
            style: {
                padding: '6px',
            },
        },
    };

    return (
        <>
            {filteredLeaves.length > 0 ? (
                <div className="px-3 sm:px-5 py-4 w-full">
                    <div className="text-center text-gray-800 mt-4">
                        <h3 className="text-xl sm:text-2xl font-bold">Manage Leaves</h3>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
                        <input
                            type="text"
                            placeholder="Search by Emp ID"
                            className="px-3 py-2 text-sm rounded-md text-gray-800 border w-full md:w-64"
                            onChange={filterByInput}
                        />
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2 md:mt-0">
                            <button
                                className="px-3 py-1.5 bg-yellow-700 text-white hover:bg-yellow-500 text-xs rounded-md"
                                onClick={() => filterByButton("Pending")}
                            >
                                Pending
                            </button>

                            <button
                                className="px-3 py-1.5 bg-green-700 text-white hover:bg-green-500 text-xs rounded-md"
                                onClick={() => filterByButton("Approved")}
                            >
                                Approved
                            </button>

                            <button
                                className="px-3 py-1.5 bg-red-800 text-white hover:bg-red-500 text-xs rounded-md"
                                onClick={() => filterByButton("Rejected")}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <DataTable
                            columns={columns}
                            data={filteredLeaves}
                            pagination
                            responsive
                            customStyles={customStyles}
                            dense
                        />
                    </div>
                </div>
            ) : (
                <div className="text-center mt-10">Loading...</div>
            )}
        </>
    );
};

export default LeaveTable;
