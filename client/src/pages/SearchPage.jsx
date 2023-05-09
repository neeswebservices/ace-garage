import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getAPI from "../api/getApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SearchPage = () => {
  const { id } = useParams();
  const [result, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const { data, isLoading, success } = useQuery(["searched"], () =>
    getAPI.searched({ id })
  );

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 m-10">
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <select className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-blue-300">
            <option value="">Filter by...</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="col-span-3">
          <div className="grid grid-flow-col grid-cols-4 gap-4">
            {data?.data?.map((item, index) => (
              <div className="bg-gray-100 rounded-lg shadow-sm">
                <img
                  src={item?.image || "https://via.placeholder.com/150"}
                  alt="Item"
                  className="w-full rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{item?.name} </h3>

                  <p className="text-gray-700 mb-2">
                    {item?.user?.username} | {item?.category?.name}
                  </p>
                  <p className="text-gray-700 mb-2">{item?.desc}</p>
                  <p className="text-gray-700 font-bold">{item?.price}</p>
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

export default SearchPage;
