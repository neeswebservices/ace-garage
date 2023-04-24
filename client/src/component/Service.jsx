import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Service = () => {
  return (
    <>
      <Navbar />
      <section className="text-black bg-white body-font overflow-hidden">
        <div className="container text-black px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="Plumber Service"
              className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded "
              src="https://images.unsplash.com/photo-1597766347634-277bf2c89c32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-black text-3xl title-font font-medium mb-1">
                Clutch Repair
              </h1>

              <p className="leading-relaxed  text-black">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut
                earum perferendis nemo facilis nobis commodi ea, dolor
                laboriosam eveniet facere fugit reiciendis, sit deleniti
                necessitatibus corporis nostrum atque animi aspernatur?
              </p>
              <h2 className="text-md  font-bold title-font text-black  tracking-widest">
                Kathmandu Branch
              </h2>
              <h2 className="text-md title-font text-red-400  tracking-widest">
                Breakdown Service
              </h2>
              <div className="flex ">
                <span className="title-font font-medium text-2xl">
                  Rs. 1099
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
