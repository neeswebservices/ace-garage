import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const EmployeeRoute = () => {
  const { logged } = useSelector((state) => state.auth);
  const { role, employee } = useSelector((state) => state.user);

  if (!logged || !employee) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
        <p className="text-lg text-center mb-8">
          You do not have permission to access employee.
        </p>
      </div>
    );
  }
  return <Outlet />;
};

export default EmployeeRoute;
