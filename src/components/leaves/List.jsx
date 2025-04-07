import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/authContext'






const List = () => {
    
    const [leaves, setLeaves] = useState([])
    let sno = 1;

    const { id } = useParams()
    const {user} = useAuth()
    

    const fetchLeaves = async () => {
    
        try {
            const response = await axios.get(`http://localhost:3000/api/leave/${id}/${user.role}`, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("API Response:", response.data);
            console.log("Leaves:", response.data.leaves);
            if(response.data.success) {
               setLeaves(response.data.leaves)
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.message)
            }
        } 
    }
    useEffect(() => {
    fetchLeaves();
}, [])
    
  return (
    <div className="p-6">
      <div className="text-center text-gray-800 mt-6">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                    type="text" 
                    placeholder="Search by Employee name"
                    className="px-4 py-0.5 rounded-md text-gray-800 border"
                    
               />
               {user.role === "employee" &&
                    <Link to="/employee-dashboard/add-leave" className="px-4 py-1 bg-pink-600 rounded-md text-white"
                    >
                    Add New Leave
                    </Link>
                }   
            </div>

            <table className="w-full text-sm text-left text-gray-800 mt-8">
                    <thead className="text-xs text-gray-800 upercase mt-6 bg-white border-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-3">SNO</th>
                            <th className="px-6 py-3">Leave Type</th>
                            <th className="px-6 py-3">From</th>
                            <th className="px-6 py-3">To</th>
                            <th className="px-6 py-3">Reason</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                
                <tbody>
                    {leaves.map((leave) => (
                        <tr 
                        key={leave.id}
                        className="bg-white border-b dark:bg-gray-300 dark:border-gray-700">
                            <td className="px-6 py-3">{sno++}</td>
                            <td className="px-6 py-3">{leave.leaveType}</td>
                            <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="px-6 py-3">{leave.reason}</td>
                            <td className="px-6 py-3">{leave.status}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default List
