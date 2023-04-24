import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SpareParts = () => {
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
      name: "Clutch 2x",
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
            List of Spare Parts
          </h1>
        </div>
        {/* Service List */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
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
                        <p className="text-gray-700">
                          {product.description}
                          {/* <button
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to cart
                          </button> */}
                        </p>
                        <p className="mt-2 text-gray-900 font-bold">
                          Rs.{product.price}
                        </p>
                        <button
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to cart
                        </button>
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
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded mt-4 hover:bg-blue-700">
                          Add to Cart
                        </button>
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

export default SpareParts;
