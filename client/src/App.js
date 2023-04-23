import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Admin/components/shared/Layout'
import Dashboard from './pages/Admin/pages/Dashboard'
import CreateBranch from './pages/Admin/pages/CreateBranch'
import TotalUser from './pages/Admin/pages/TotalUser'
import TotalEmployee from './pages/Admin/pages/TotalEmployee'
import TotalProduct from './pages/Admin/pages/TotalProduct'
import CreateEmployee from './pages/Admin/pages/CreateEmployee'
import CreateCategory from './pages/Admin/pages/CreateCategory'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import EmployeeLayout from './pages/Employee/components/shared/EmployeeLayout'
import CreateService from './pages/Employee/pages/CreateService'
import CreateSparePart from './pages/Employee/pages/CreateSparePart'
import Appointment from './pages/Employee/pages/Appointment'
import Report from './pages/Employee/pages/Report'
import AppointmentNavbar from './pages/AppointmentNavbar'



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment" element={<AppointmentNavbar />} />


        {/* Admin */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/branch" element={<CreateBranch />} />
          <Route path="/admin/totalusers" element={<TotalUser />} />
          <Route path="/admin/totalemployee" element={<TotalEmployee />} />
          <Route path="/admin/category" element={<CreateCategory />} />
          <Route path="/admin/totalproducts" element={<TotalProduct />} />
          <Route path="/admin/createemployee" element={<CreateEmployee />} />
        </Route>

        {/* Employee*/}
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/employee/addservice" element={<CreateService />} />
          <Route path="/employee/createsparepart" element={<CreateSparePart />} />
          <Route path="/employee/appointment" element={<Appointment />} />
          <Route path="/employee/report" element={<Report />} />


        </Route>
      </Routes>
    </Router>
  )
}

export default App





