import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import {columns, EmployeeButtons} from '../../utils/EmployeeHelper'
import axios from 'axios'




const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployees, setFilteredEmployees] = useState([])



    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const response = await axios.get('https://sems-backend.onrender.com/api/employee', {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log("Employee API Response:", response.data);
                if(response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp, index) => ({
                        _id: emp._id,
                        sno: index + 1,
                        dep_name: emp.department ? emp.department.dep_name : "No Department",
                        name: emp.userId ? emp.userId.name : "No Name",  // 
                        dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "No DOB",
                        profileImage: emp.userId && emp.userId.profileImage
                        ? <img src={`https://sems-backend.onrender.com/${emp.userId.profileImage}`} alt="Profile" className="w-12 h-12 object-cover rounded-full" />
                        : <img src="path_to_default_image.jpg" alt="Default Profile" className="rounded-full" />,
                        actions: (<EmployeeButtons Id={emp._id} />)
                    }));

                console.log("Processed Employees for Table:", data);
                setEmployees(data)
                setFilteredEmployees(data)
                }
            } catch(error) {
            
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
                console.error("Fetch Employees Error:", error)
            } finally {
                setEmpLoading(false)
            }
        }
        fetchEmployees();
    }, [])

    const handleFilter = async (e) => {
        const records = employees.filter((emp) => {
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilteredEmployees(records)
    }
  return (
    <div className="p-6">
      <div className="text-center text-gray-800">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                    type="text" 
                    placeholder="Search by Employee name"
                    onChange={handleFilter}
                    className="px-4 py-0.5 rounded-md text-gray-800 border"
                    
               />
                <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-pink-600 rounded-md text-white"
                >
                Add New Employee
                </Link>
            </div>
            <div className="mt-6">
                <DataTable columns={columns} data={filteredEmployees} pagination/>
            </div>
    </div>
  )
}

export default EmployeeList
