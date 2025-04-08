import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const ViewSalary = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    const { user } = useAuth();
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`https://sems-backend.onrender.com/api/salary/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter((leave) =>
            leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <div className="w-full px-3 sm:px-5 md:px-10 py-6">
            {filteredSalaries === null ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : (
                <div className="w-full">
                    <div className="text-center mb-4">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Salary History</h2>
                    </div>

                    {user.role === 'employee' && (
                        <div className="flex justify-end mb-3">
                            <input
                                type="text"
                                placeholder="Search by Emp ID"
                                className="border px-3 py-1 text-sm rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => filterSalaries(e.target.value)}
                            />
                        </div>
                    )}

                    {filteredSalaries.length > 0 ? (
                        <table className="w-full text-[10px] sm:text-xs md:text-sm text-gray-700 table-fixed border border-gray-300">
                            <thead className="bg-gray-100 uppercase text-gray-600">
                                <tr>
                                    <th className="px-1 sm:px-2 py-2 w-[6%]">SNO</th>
                                    <th className="px-1 sm:px-2 py-2 w-[15%]">Emp ID</th>
                                    <th className="px-1 sm:px-2 py-2 w-[12%]">Salary</th>
                                    <th className="px-1 sm:px-2 py-2 w-[14%]">Allowance</th>
                                    <th className="px-1 sm:px-2 py-2 w-[14%]">Deduction</th>
                                    <th className="px-1 sm:px-2 py-2 w-[12%]">Total</th>
                                    <th className="px-1 sm:px-2 py-2 w-[17%]">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary) => (
                                    <tr key={salary.id} className="bg-white even:bg-gray-50 border-b">
                                        <td className="px-1 sm:px-2 py-2 text-center">{sno++}</td>
                                        <td className="px-1 sm:px-2 py-2 truncate">{salary.employeeId.employeeId}</td>
                                        <td className="px-1 sm:px-2 py-2">{salary.basicSalary}</td>
                                        <td className="px-1 sm:px-2 py-2">{salary.allowances}</td>
                                        <td className="px-1 sm:px-2 py-2">{salary.deductions}</td>
                                        <td className="px-1 sm:px-2 py-2">{salary.netSalary}</td>
                                        <td className="px-1 sm:px-2 py-2">{new Date(salary.payDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-gray-500">No Records</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewSalary;
