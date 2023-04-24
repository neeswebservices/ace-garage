import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ServiceList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Dummy data
  const dummyProducts = [
    {
      id: 1,
      name: "Clutch Repair",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      price: 1099,
      image:
        "https://images.unsplash.com/photo-1597766347634-277bf2c89c32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-7 sm:px-6 lg:px-8">
          <h1 className="text-4xl  mt-16 font-bold text-center ">
            Service List
          </h1>
        </div>
        {/* Service List */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-wrap -mx-4">
            {products.length > 0
              ? products.map((product) => (
                  <div
                    key={product.id}
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
                      </div>
                    </div>
                  </div>
                ))
              : dummyProducts.map((product) => (
                  <div
                    key={product.id}
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
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceList;
