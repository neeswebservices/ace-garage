import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import getAPI from "../../../api/getApi";
import Spinner from "../../../components/common/Spinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../../../api/axiosClient";
import { toast } from "react-toastify";

const AddService = () => {
  const { register, reset, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { userToken } = useSelector((state) => state.auth);
  const { data: category, isLoading: catLoading } = useQuery(["category"], () =>
    getAPI.getCategory()
  );
  const { data: branches, isLoading: branchLoading } = useQuery(
    ["branches"],
    () => getAPI.getBranches()
  );

  const submitForm = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("desc", data.desc);
    formData.append("category", data.category);
    formData.append("branch", data.branch);
    formData.append("image", data.file[0]);

    console.log(formData);

    try {
      const response = await axios.post(
        `${baseURL}/employee/service`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);

      if (response.status == 200) {
        reset();
        queryClient.invalidateQueries("service");
      }
      toast(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  if (catLoading || branchLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-center font-bold text-2xl"> Add Service</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Service Name
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          {...register("name")}
          type="text"
          placeholder="Service Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
          Price
        </label>
        <input
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          {...register("price")}
          placeholder="Service Price"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Service Description"
          {...register("desc")}
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="category"
            {...register("category")}
          >
            {category?.data?.map((item, index) => (
              <option key={index} defaultValue={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="category"
        >
          Select Branch Location
        </label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="category"
            {...register("branch")}
          >
            {branches?.data?.map((item, index) => (
              <option key={index} defaultValue={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="file"
          {...register("file")}
          accept="image/*"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Service
        </button>
      </div>
    </form>
  );
};
export default AddService;
