import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddLeave = () => {
    const {user} = useAuth()
    const [leave, setLeave] = useState({
        userId: user._id
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target
        setLeave((prevState) => ({...prevState, [name] : value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3000/api/leave/add`, leave, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data);
            
            if(response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`)
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } 
    }
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type */}
              <div>
                  <label className="block text-sm font-medium text-gray-800">
                      Leave Type
                  </label>
                  <select
                    name="leaveType"
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                  >
                      <option value="">Select Gender</option>
                      <option value="sick leave">Sick Leave</option>
                      <option value="casual leave">Casual Leave</option>
                      <option value="annual leave">Annual Leave</option>
                      <option value="pregnacy leave">Pregnancy Leave</option>
                  </select>
              </div>
          </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From date */}
                <div>
                  <label className="block text-sm font-medium text-gray-800">
                      From Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>


              {/* To date */}
              <div>
                  <label className="block text-sm font-medium text-gray-800">
                      To Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                  />
              </div>
            </div>
        

              {/* Description */}
              <div>
                  <label className="block text-sm font-medium text-gray-800">
                      Description
                  </label>
                  <textarea
                    name="reason"
                    onChange={handleChange}
                    placeholder="Reason"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                  ></textarea>
 
                    <button
                        type="submit"
                        className="w-full mt-6 bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded-md"
                        >
                        Request Leave
                    </button>
                </div>
      </form>
    </div>
  )
}

export default AddLeave
