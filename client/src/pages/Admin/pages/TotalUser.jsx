import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import adminAPI from "../../../api/adminApi.js";
import getAPI from "../../../api/getApi.js";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";

function TotalUser() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery(["users"], () =>
    getAPI.getUsers()
  );

  const handleCreate = (id) => {
    adminAPI.createEmployee({ user: id });
    queryClient.invalidateQueries("users");
    refetch();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-blue-600">
        <h1 className="text-lg font-semibold text-white">Total Users</h1>
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
                Address
              </th>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                Phone
              </th>
              <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data?.data?.map((item, index) => (
                <tr key={index}>
                  <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                    {item?.name ?? "Example..."}
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                    <img
                      src={item?.profile}
                      alt={item.username}
                      className="w-4 h-4 rounded-full inline-block mr-5"
                    />
                    {item?.username}
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                    {item?.email}
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                    {item?.address}
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                    {item?.phone}
                  </td>

                  <td className="p-3 font-medium  text-gray-800 border border-gray-300">
                    <BsFillArrowUpSquareFill
                      className={"cursor-pointer"}
                      onClick={(e) => handleCreate(item?._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TotalUser;
