import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import getAPI from "../api/getApi";
import Spinner from "./common/Spinner";
import { useQuery } from "@tanstack/react-query";

const Service = () => {
  const { id } = useParams();

  const { data, isLoading, success } = useQuery(["service"], () =>
    getAPI.getSingleService({ id })
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <section className="text-black bg-white body-font overflow-hidden">
        <div className="container text-black px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="Plumber Service"
              className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded "
              src={data?.data?.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-black text-3xl title-font font-medium mb-1">
                {data?.data?.name}
              </h1>

              <h2 className="text-md  font-bold title-font text-black  tracking-widest">
                {data?.data?.desc}
              </h2>
              <h2 className="text-md title-font text-red-400  tracking-widest">
                {data?.data?.branch?.address} | {data?.data?.branch?.city}
              </h2>
              <p>{data?.data?.category?.name}</p>
              <div className="flex ">
                <span className="title-font font-medium text-2xl">
                  Rs. {data?.data?.price}
                </span>
              </div>
              <button className="ml-auto  mt-4 rounded-md bg-blue-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-red-500">
                Book Service
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Service;
