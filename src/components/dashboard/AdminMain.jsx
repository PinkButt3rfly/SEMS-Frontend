import React from 'react'
import SummaryCard from './SummaryCard'
import { FaUsers, FaBuilding, FaMoneyBill, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'


const AdminMain = () => {

  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('https://sems-backend.onrender.com/api/dashboard/summary', {
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummary(summary.data)
      } catch(error) {
          if(error.response) {
            alert(error.response.data.error)
          }
             
      }
    }
    fetchSummary()
  }, [])

  if(!summary) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-gray-800">

            <SummaryCard 
              icon={<FaUsers />} 
              text="Total Employees" 
              number={summary.totalEmployees} 
              color="bg-pink-600" 
            />

            <SummaryCard 
              icon={<FaBuilding />} 
              text="Total Departments" 
              number={summary.totalDepartments} 
              color="bg-gray-800" 
            />

            <SummaryCard 
              icon={<FaMoneyBill />} 
              text="Monthly Salary" 
              number={summary.totalSalary} 
              color="bg-red-800" 
              />

        </div>

        <div className="mt-12">
            <h4 className="text-center text-2xl font-bold">Leave Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            <SummaryCard 
              icon={<FaFileAlt />} 
              text="Leave Applied" 
              number={summary.leaveSummary.appliedFor} 
              color="bg-blue-600" 
            />

            <SummaryCard 
              icon={<FaCheckCircle />} 
              text="Leave Approved" 
              number={summary.leaveSummary.approved}
              color="bg-green-600" 
            />

            <SummaryCard 
              icon={<FaHourglassHalf />} 
              text="Leave Pending" 
              number={summary.leaveSummary.pending}
              color="bg-yellow-600" 
            />

            <SummaryCard 
              icon={<FaTimesCircle />} 
              text="Leave Rejected" 
              number={summary.leaveSummary.rejected} 
              color="bg-red-600" 
            />
            </div>
        </div>
    </div>
  )
}

export default AdminMain
