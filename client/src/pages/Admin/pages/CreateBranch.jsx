import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import adminAPI from "../../../api/adminApi";
import getAPI from "../../../api/getApi";

const CreateBranch = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery(["branch"], () =>
    getAPI.getBranches()
  );

  const submitForm = async (data) => {
    const res = await adminAPI.createBranch({ ...data });

    if (res?.success) {
      reset();
      queryClient.invalidateQueries("branch");
    }

    // Add code to submit form data to server or store in state
  };

  return (
    <div className="flex flex-col items-start ml-8">
      <h2 className="text-2xl font-bold mb-4">Create Branch</h2>
      <form onSubmit={handleSubmit(submitForm)} className="w-full max-w-sm">
        <div className="flex flex-wrap mb-4">
          <label
            htmlFor="first-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Branch Name:
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            {...register("name")}
          />
        </div>
        <div className="flex flex-wrap mb-4">
          <label
            htmlFor="first-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Branch Address:
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            {...register("address")}
          />
        </div>
        <div className="flex flex-wrap mb-4">
          <label
            htmlFor="first-name"
            className="block text-gray-700 font-bold mb-2"
          >
            City :
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            {...register("city")}
          />
        </div>
        <div className="flex flex-wrap mb-4">
          <label
            htmlFor="first-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Country:
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            {...register("country")}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Branch
        </button>
      </form>

      {/* <div>
        {data?.data?.map((item, index) => (
          <div key={index}>{item?.name}</div>
        ))}
      </div> */}

      <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Branches</h2>

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className=" text-left px-4 py-2">Address</th>
            <th className="px-4 text-left py-2">City</th>
            <th className="px-4 text-left py-2">Name</th>
            <th className="px-4 text-left py-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{item?.name}</td>
              <td className="border px-4 py-2">{item?.address}</td>
              <td className="border px-4 py-2">{item?.city}</td>
              <td className="border px-4 py-2">{item?.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateBranch;
