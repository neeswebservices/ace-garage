import React from "react";
import { Link } from "react-router-dom";

const PleaseLogin = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Please Login to Access This Page</h2>
        <div className="flex flex-col gap-4">
          <p className="text-center text-gray-500">
            You must be logged in to view this page. Please log in or{" "}
            <Link to="/register" className="text-blue-500">
              register
            </Link>{" "}
            if you don't have an account yet.
          </p>
          <div className="flex justify-center">
            <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PleaseLogin;
