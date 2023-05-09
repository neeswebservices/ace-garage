import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BsFillCartPlusFill } from "react-icons/bs";
import getAPI from "../api/getApi";
import Spinner from "./common/Spinner.jsx";
import { baseURL } from "../api/axiosClient.js";
// import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

// function useAddToCart() {
//   const [mutate, { isLoading }] = useMutation(getAPI.addToCart);
//   return { addToCart: mutate, loading: isLoading };
// }

const SpareParts = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery(["spare"], () => getAPI.getSpare());

  // const mutation = useMutation({
  //   mutationFn: (newTodo) => {
  //     return axios.post('/todos', newTodo)
  //   },
  // })

  // const { addToCart, loading } = useAddToCart();

  // const { mutate, loading } = useMutation(async () => {
  //   const response = await axios.post('/api/cart', { itemId });
  //   return response.data;
  // });

  const {
    mutate,
    isLoading: loading,
    isSuccess,
    data,
  } = useMutation((id) => getAPI.addToCart({ id }), {
    onSuccess: () => {
      toast.info("Item added to cart");
    },
  });

  async function handleAddToCart(product) {
    console.log(product);
    try {
      mutate(product._id);
    } catch (err) {
      console.log(err);
    }
  }

  // const { mutate } = useMutation((productId) =>
  //   getAPI.addToCart({ id: productId })
  // );

  // async function handleAddToCart(product) {
  //   try {
  //     await mutate(product._id, );
  //     console.log("Item added to cart");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // async function handleAddToCart(product) {
  //   console.log(product);
  //   try {
  //     const res = useQuery(["item"], () =>
  //       getAPI.addToCart({ id: product._id })
  //     );
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   // addToCart({ item }).then(() => {
  //   // toast.success("Item added to cart");
  //   // });
  // }

  // if (loading) {
  //   return <Spinner />;
  // }

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
            {products ? (
              products?.data?.map((product) => (
                <div
                  key={product._id}
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
            ) : (
              <div>No products</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpareParts;
