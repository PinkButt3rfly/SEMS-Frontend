import { useNavigate } from "react-router-dom";
import axios from "axios";  

export const columns = [
    {
        name: "S NO",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.actions,
    },
];

export const DepartmentButtons = ({ departmentId, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you want to delete?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    onDepartmentDelete();
                }
            } catch (error) {
                if (error.response && error.response.data?.error) {
                    alert(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-green-500 text-white rounded-md"
                onClick={() => navigate(`/admin-dashboard/department/${departmentId}`)}
            >
                Edit
            </button>

            <button
                className="px-3 py-1 bg-red-500 text-white rounded-md"
                onClick={() => handleDelete(departmentId)} 
            >
                Delete
            </button>
        </div>
    );
};
