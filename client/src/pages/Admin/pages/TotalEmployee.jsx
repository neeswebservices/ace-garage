import React, { useState } from "react";

function TotalEmployee() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <h1 className="text-lg font-semibold text-white">Total Employee</h1>
        <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500">
          Refresh
        </button>
      </div>
      <div className="flex-grow px-4 py-6 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                ID
              </th>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                Name
              </th>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                Username
              </th>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                Email
              </th>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                PAN
              </th>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                Address
              </th>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300"></td>
              <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300"></td>
              <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300"></td>
              <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300"></td>
              <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300"></td>
              <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300"></td>
              <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TotalEmployee;
