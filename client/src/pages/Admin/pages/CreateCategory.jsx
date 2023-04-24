import { useState } from "react";
import { useForm } from "react-hook-form";
import adminAPI from "../../../api/adminApi.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getAPI from "../../../api/getApi.js";

const CreateCategory = () => {
  const { register, reset, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const submitForm = async (data) => {
    console.log(data);
    const res = await adminAPI.createCategory({ ...data });

    if (res?.status) {
      reset();
      queryClient.invalidateQueries("category");
    }

    // Add code to submit form data to server or store in state
  };

  const { data, isLoading, error, refetch } = useQuery(["category"], () => getAPI.getCategory());

  return (
    <>
      <div className="flex flex-col items-start ml-8">
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>
        <form onSubmit={handleSubmit(submitForm)} className="w-full max-w-sm">
          <div className="flex flex-wrap mb-4">
            <label htmlFor="first-name" className="block text-gray-700 font-bold mb-2">
              Category Name:
            </label>
            <input
              type="text"
              id="branchName"
              placeholder="Basic or Breakdown"
              {...register("name")}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Category
          </button>
        </form>
      </div>

      <div>
        {data?.data.map((item, key) => (
          <div key={key} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
            <span className="text-gray-800 text-lg font-medium">{item.name}</span>
            <button className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CreateCategory;
