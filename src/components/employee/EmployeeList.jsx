import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('https://sems-backend.onrender.com/api/employee', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp, index) => ({
                        _id: emp._id,
                        sno: index + 1,
                        dep_name: emp.department ? emp.department.dep_name : "No Department",
                        name: emp.userId ? emp.userId.name : "No Name",
                        dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "No DOB",
                        profileImage: emp.userId && emp.userId.profileImage
                            ? <img src={`https://sems-backend.onrender.com/${emp.userId.profileImage}`} alt="Profile" className="w-12 h-12 object-cover rounded-full" />
                            : <img src="path_to_default_image.jpg" alt="Default Profile" className="rounded-full" />,
                        actions: (<EmployeeButtons Id={emp._id} />)
                    }));

                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
                console.error("Fetch Employees Error:", error);
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = async (e) => {
        const records = employees.filter((emp) => {
            return emp.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredEmployees(records);
    };

    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Employees</h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search by Employee name"
                    onChange={handleFilter}
                    className="px-4 py-2 rounded-md text-gray-800 border w-full md:w-1/3"
                />
                <Link 
                    to="/admin-dashboard/add-employee" 
                    className="px-4 py-2 bg-pink-600 rounded-md text-white w-full md:w-auto text-center"
                >
                    Add New Employee
                </Link>
            </div>

            <div className="overflow-x-auto mt-6">
                <DataTable 
                    columns={columns} 
                    data={filteredEmployees} 
                    pagination 
                    progressPending={empLoading}
                />
            </div>
        </div>
    );
};

export default EmployeeList;
