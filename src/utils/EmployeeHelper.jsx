import axios from "axios"
import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: "S NO",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "100px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
        
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "120px"
        
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "120px"
    },
    {
        name: "Action",
        selector: (row) => row.actions,
        center: true
    },
];



export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get('https://sems-backend.onrender.com/api/department', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.data.success) {
            departments = response.data.departments
        }
    } catch(error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments 
};


//Employees for salary form

export const getEmployees = async (id) => {
    let employees
    try {
        const response = await axios.get(`https://sems-backend.onrender.com/api/employee/department/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.data.success) {
            employees = response.data.employees
        }
    } catch(error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return employees 
};


export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();
    


    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-pink-500 text-white rounded-md"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >
                View
            </button>

            <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)} 
            >
                Edit
            </button>

            <button
                className="px-3 py-1 bg-yellow-500 text-white rounded-md" 
                onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >
                Salary
            </button>

            <button
                className="px-3 py-1 bg-red-500 text-white rounded-md" 
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >
                Leave
            </button>
        </div>
    );
};
