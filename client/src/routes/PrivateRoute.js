import React from "react";
import useAuth from "../hooks/useAuth.js";
import { NavLink, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const { logged } = useSelector((state) => state.auth);
  const auth = useAuth();

  if (!auth?.status) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
        <p className="text-lg text-center mb-8">You do not have permission to access this page.</p>
        <NavLink to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Login
        </NavLink>
      </div>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
