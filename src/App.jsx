import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminMain from "./components/dashboard/AdminMain";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import Edit from "./components/department/Edit";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import View from "./components/employee/View";
import EditEmployee from "./components/employee/EditEmployee";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import Summary from "./components/EmployeeDashboard/Summary";
import List from "./components/leaves/List";
import AddLeave from "./components/leaves/AddLeave";
import Setting from "./components/EmployeeDashboard/Setting"
import LeaveTable from "./components/leaves/LeaveTable"
import LeaveDetails from "./components/leaves/LeaveDetails";


function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin"]}>
            <AdminDashboard />
          </RoleBaseRoutes>  
        </PrivateRoutes>
        
        }>

          <Route index element={<AdminMain />} ></Route>


          <Route path="/admin-dashboard/departments" element={<DepartmentList />} ></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} ></Route>
          <Route path="/admin-dashboard/department/:id" element={<Edit />} ></Route>

          <Route path="/admin-dashboard/add-employee" element={<AddEmployee />} ></Route>
          <Route path="/admin-dashboard/employees" element={<EmployeeList />} ></Route>
          <Route path="/admin-dashboard/employees/:id" element={<View />} ></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<EditEmployee />} ></Route>
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />} ></Route>


          <Route path="/admin-dashboard/salary/add" element={<AddSalary />} ></Route>
          <Route path="/admin-dashboard/leaves" element={<LeaveTable />} ></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetails />} ></Route>
          <Route path="/admin-dashboard/employees/leaves/:id" element={<List />} ></Route>

          <Route path='/admin-dashboard/setting' element={<Setting />} ></Route>
        </Route>


        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        
      } 
        
        >
          <Route index element={<Summary />} ></Route>

          <Route path='/employee-dashboard/profile/:id' element={<View />} ></Route>
          <Route path='/employee-dashboard/leaves' element={<List />}></Route>

          <Route path='/employee-dashboard/leaves/:id' element={<List />} ></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />} ></Route>
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />} ></Route>
          <Route path='/employee-dashboard/setting' element={<Setting />} ></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
