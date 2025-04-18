import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
    const { id } = useParams()
    const [department, setDepartment] = useState({ dep_name: '', description: '' })
    const [depLoading, setDepLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get(`https://sems-backend.onrender.com/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error || 'Something went wrong')
                }
            } finally {
                setDepLoading(false)
            }
        }
        fetchDepartment()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setDepartment({ ...department, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`https://sems-backend.onrender.com/api/department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success) {
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error || 'Failed to update department')
            }
        }
    }

    return (
        <>
            {depLoading ? (
                <div className="flex justify-center items-center text-xl">Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                    <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep_name" className="text-sm font-medium text-gray-800">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                onChange={handleChange}
                                value={department.dep_name}
                                placeholder="Department Name"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-800">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                value={department.description}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                rows="4"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Edit Department
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Edit
