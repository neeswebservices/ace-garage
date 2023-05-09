import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import getAPI from "../api/getApi";
import { Link } from "react-router-dom";
import Spinner from "./common/Spinner";

const ServiceList = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery(["service"], () => getAPI.getService());
  console.log(products);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="min-h-screen mt-[-68px]">
        <div className="max-w-7xl mx-auto py-7 sm:px-6 lg:px-8">
          <h1 className="text-4xl  mt-16 font-bold text-center ">Services</h1>
        </div>
        {/* Service List */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
          <div className="flex flex-wrap -mx-4">
            {Array.from(products?.data).map((product, index) => (
              <Link
                to={`service/${product?._id}`}
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
              >
                <div className="bg-white rounded-sm shadow-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover hover:scale-[1.1]"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h2>
                    <p className="text-gray-700">{product.description}</p>
                    <p className="mt-2 text-gray-900 font-bold">
                      Rs.{product.price}
                    </p>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded mt-4 hover:bg-blue-700">
                      Book Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceList;
