import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBuilding, FaUsers, FaCalendarAlt, FaMoneyBill, FaCogs } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-full sm:w-64 md:w-64 lg:w-64 xl:w-64">
      <div className="bg-pink-600 h-12 flex items-center justify-center text-white">
        <h3 className="text-2xl text-center font-poppins">Employee MS</h3>
      </div>
      <div className="px-4 mt-4 space-y-2">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) => `${isActive ? 'bg-pink-600 ' : ' '}flex items-center space-x-4 block py-2.5 px-4 rounded`}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) => `${isActive ? 'bg-pink-600 ' : ' '}flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) => `${isActive ? 'bg-pink-600 ' : ' '}flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) => `${isActive ? 'bg-pink-600 ' : ' '}flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) => `${isActive ? 'bg-pink-600 ' : ' '}flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaMoneyBill />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) => `${isActive ? 'bg-pink-600 ' : ' '}flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
