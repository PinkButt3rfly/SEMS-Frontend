import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'

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
            if (response.data.success) {
                let sno = 1
                const data = await response.data.departments.map((dep) => (
                    {
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        actions: (<DepartmentButtons departmentId={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                    }
                ))
                setDepartments(data)
                setFilteredDepartments(data)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setDepLoading(false)
        }
    }

    useEffect(() => {
        fetchDepartments()
    }, [])

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setFilteredDepartments(records)
    }

    return (
        <>
            {depLoading ? <div>Loading...</div> :
                <div className="p-5">
                    <div className="text-center text-gray-800">
                        <h3 className="text-2xl font-bold">Manage Departments</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
                        <input
                            type="text"
                            placeholder="Search by Dept.. name"
                            onChange={filterDepartments}
                            className="px-4 py-2 rounded-md text-gray-800 border w-full sm:w-1/3 mb-3 sm:mb-0"
                        />
                        <Link
                            to="/admin-dashboard/add-department"
                            className="px-4 py-2 bg-pink-600 rounded-md text-white text-center w-full sm:w-auto"
                        >
                            Add New Department
                        </Link>
                    </div>
                    <div className="mt-5">
                        <DataTable
                            columns={columns}
                            data={filteredDepartments}
                            pagination
                            responsive
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default DepartmentList
