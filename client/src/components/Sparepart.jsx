import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Sparepart = () => {
  return (
    <>
      <Navbar />
      <section className="text-black bg-white body-font overflow-hidden">
        <div className="container text-black px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt=""
              className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded "
              src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024,h_577/https://backbiker.com/wp-content/uploads/2022/09/Bicycle-driverain-1024x577.png"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-black text-3xl title-font font-medium mb-1">
                Clutch 2x
              </h1>

              <p className="leading-relaxed  text-black">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut
                earum perferendis nemo facilis nobis commodi ea, dolor
                laboriosam eveniet facere fugit reiciendis, sit deleniti
                necessitatibus corporis nostrum atque animi aspernatur?
              </p>

              <div className="flex ">
                <span className="title-font font-medium text-2xl">
                  Rs. 1099
                </span>
              </div>
              <button className="ml-auto  mt-4 rounded-md bg-blue-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-red-500">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Sparepart;
