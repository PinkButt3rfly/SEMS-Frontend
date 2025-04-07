import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaBuilding, FaUsers, FaCalendarAlt, FaMoneyBill, FaCogs } from 'react-icons/fa'

const AdminSidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`bg-gray-800 text-white h-screen fixed top-0 left-0 w-64 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 z-50`}
    >
      <div className="bg-pink-600 h-12 flex items-center justify-center text-white">
        <h3 className="text-2xl text-center font-poppins">Employee MS</h3>
      </div>
      <div className="px-4 mt-4 space-y-2">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? 'bg-pink-600' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${isActive ? 'bg-pink-600' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${isActive ? 'bg-pink-600' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? 'bg-pink-600' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${isActive ? 'bg-pink-600' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaMoneyBill />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${isActive ? 'bg-pink-600' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar
