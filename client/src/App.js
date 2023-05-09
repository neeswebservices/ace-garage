import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Admin/components/shared/Layout";
import Dashboard from "./pages/Admin/pages/Dashboard";
import CreateBranch from "./pages/Admin/pages/CreateBranch";
import TotalUser from "./pages/Admin/pages/TotalUser";
import TotalEmployee from "./pages/Admin/pages/TotalEmployee";
import TotalProduct from "./pages/Admin/pages/TotalProduct";
import CreateCategory from "./pages/Admin/pages/CreateCategory";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmployeeLayout from "./pages/Employee/components/shared/EmployeeLayout";
import CreateService from "./pages/Employee/pages/CreateService";
import CreateSparePart from "./pages/Employee/pages/CreateSparePart";
import Appointment from "./pages/Employee/pages/Appointment";
import Report from "./pages/Employee/pages/Report";
import AppointmentNavbar from "./pages/AppointmentNavbar";
import useAuth from "./hooks/useAuth.js";
import ProtectedRoute from "./routes/PrivateRoute.js";
import { useGetDetailsQuery } from "./app/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./features/user/userSlice";
import Protected from "./routes/ProtectedRoute";
import AdminRoute from "./routes/adminRoute";
import EmployeeRoute from "./routes/employeeRoute";
import Contact from "./components/Contact";
import Service from "./components/Service";
import { userLogin } from "./features/auth/authAction";
import ServiceList from "./components/SpareParts";
// import SpareParts from "./components/SpareParts";
// import ServiceList from "./components/SpareParts";
import SpareParts from "./components/SpareParts";
import Sparepart from "./components/Sparepart";
import FAQ from "./pages/Admin/pages/FAQ";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage.jsx";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const { loading, logged, userToken, userInfo, error } = useSelector(
    (state) => state.auth
  );

  const { data, isFetching, refetch } = useGetDetailsQuery("userDetails", {
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (data && !isFetching) {
      dispatch(setCredentials(data.data));
    }
    refetch();
  }, [data, dispatch, userToken, logged, loading]);

  // changes

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/spareparts" element={<SpareParts />} />
          <Route path="/single-sparepart" element={<Sparepart />} />
          <Route path="/service/:id" element={<Service />} />
          <Route path="/search/:id" element={<SearchPage />} />
          <Route path="/mycart" element={<CartPage />} />

          <Route element={<Protected />}>
            <Route path="/appointment" element={<AppointmentNavbar />} />
          </Route>

          {/* Admin */}

          {/* <Route element={<AdminRoute />}> */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/branch" element={<CreateBranch />} />
            <Route path="/admin/totalusers" element={<TotalUser />} />
            <Route path="/admin/totalemployee" element={<TotalEmployee />} />
            <Route path="/admin/category" element={<CreateCategory />} />
            <Route path="/admin/totalproducts" element={<TotalProduct />} />
            <Route path="/admin/faq" element={<FAQ />} />
          </Route>
          {/* </Route> */}

          {/* Employee*/}
          <Route element={<EmployeeRoute />}>
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/employee/addservice" element={<CreateService />} />
              <Route
                path="/employee/createsparepart"
                element={<CreateSparePart />}
              />
              <Route path="/employee/appointment" element={<Appointment />} />
              <Route path="/employee/report" element={<Report />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
