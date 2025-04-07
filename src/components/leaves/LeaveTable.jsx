import React from 'react'
import { useEffect, useState } from 'react'
import { columns, LeaveButtons } from '../../utils/LeaveHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'





const LeaveTable = () => {
    const [leaves, setLeaves] = useState([])
    const [filteredLeaves, setFilteredLeaves] = useState([])

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('https://sems-backend.onrender.com/api/leave', {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            
            if(response.data.success) {
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
                
               setLeaves(data)
               setFilteredLeaves(data);
            }
        } catch(error) {
        
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    useEffect(() => {
        fetchLeaves()
    }, [])

    const filterByInput = (e) => {
        const data = leaves.filter(leave => 
            leave.employeeId
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
        setFilteredLeaves(data)
    }

    const filterByButton = (status) => {
        const data = leaves.filter(leave => 
            leave.status
            .toLowerCase()
            .includes(status.toLowerCase())
        );
        setFilteredLeaves(data)
    }
  return (
      <>
      {filteredLeaves ?  (
    <div className="p-6">
      <div className="text-center text-gray-800 mt-6">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                    type="text" 
                    placeholder="Search by Emp ID"
                    className="px-4 py-0.5 rounded-md text-gray-800 border"
                    onChange={filterByInput}
                    
               />
               <div className="space-x-3">
                    <button 
                    className="px-2 py-1 bg-yellow-700 text-white hover:bg-yellow-500 rounded-md"
                    onClick={() => filterByButton("Pending")}
                    >
                        Pending
                    </button>

                    <button 
                    className="px-2 py-1 bg-green-700 text-white hover:bg-green-500 rounded-md"
                    onClick={() => filterByButton("Approved")}
                    >
                        Approved
                    </button>

                    <button 
                    className="px-2 py-1 bg-red-800 text-white hover:bg-red-500 rounded-md"
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
    ) : <div>Loading...</div>}
    </>
  )
}

export default LeaveTable
