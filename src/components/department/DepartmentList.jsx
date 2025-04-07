import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {columns, DepartmentButtons} from '../../utils/DepartmentHelper'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'



const DepartmentList = () => {
    const [departments, setDepartments] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete = () => {
        fetchDepartments()
    }

    const fetchDepartments = async () => {
        setDepLoading(true)
        try {
            const response = await axios.get('https://sems-backend.onrender.com/api/department', {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                let sno = 1;
                const data = await response.data.departments.map((dep) => (
                {
                    _id: dep._id,
                    sno: sno++,
                    dep_name: dep.dep_name,
                    actions: (<DepartmentButtons departmentId={dep._id} onDepartmentDelete={onDepartmentDelete}/>)

                }
            ))
            setDepartments(data)
            setFilteredDepartments(data)
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setDepLoading(false)
        }
    }

    useEffect(() => { 
        fetchDepartments();
    }, [])

    const filterDepartments = async (e) => {
        const records = departments.filter((dep) => 
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(records)
    }
  return (
    <>{depLoading ? <div>Loading...</div> :
        <div className="p-5">
            <div className="text-center text-gray-800">
                <h3 className="text-2xl font-bold">Manage Departments</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                type="text" 
                placeholder="Search by Dept.. name"
                onChange={filterDepartments}
                className="px-4 py-0.5 rounded-md text-gray-800 border" />
                <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-pink-600 rounded-md text-white"
                >
                Add New Department
                </Link>
            </div>
            <div className="mt-5">
                <DataTable columns={columns} data={filteredDepartments} pagination/>
            </div>
        </div>
     }
    </>
  )
}

export default DepartmentList
