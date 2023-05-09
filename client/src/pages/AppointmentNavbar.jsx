import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import Spinner from "../components/common/Spinner";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import getAPI from "../api/getApi";
import adminAPI from "../api/adminApi";
import { useNavigate } from "react-router-dom";

const ApppointmentNavbar = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { data: category, isLoading: catLoading } = useQuery(["category"], () =>
    getAPI.getCategory()
  );

  const inputRef = useRef();

  const [ticked, setTicked] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);
  const [ip, setIp] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    async function getLocationInfo(ip) {
      const data = await axios.get(`http://ip-api.com/json/${ip}`);
      return data;
    }
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => setIp(data.ip))
      .catch((error) => console.error(error));
    if (ip) {
      getLocationInfo(ip).then((data) => setLocation(data.data));
    }
  }, [ip]);

  useEffect(() => {
    if (latitude && longitude) {
      // fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=YOUR_ACCESS_TOKEN`)
      //     .then(response => response.json())
      //     .then(data => {
      //         console.log(data)
      //         setLocation(data.features[0].place_name)
      //     })
      //     .catch(error => console.error(error));
    }
  }, [latitude, longitude]);

  const submitForm = async (data) => {
    ticked && (data.address = inputRef.current?.value);
    const res = await adminAPI.createAppointment({ ...data });
    console.log(data);

    if (res?.success) {
      reset();
      navigate("/");
    }
  };

  function handleChange() {
    setTicked((prev) => !prev);
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center gap-8 p-8 my-10">
        <div className="flex-2">
          {" "}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.970155354489!2d85.28343681442489!3d27.71820773162278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19534ecde4fb%3A0xe7cf4f6dd85b5445!2sBiker&#39;s%20point%20swoyambhu!5e0!3m2!1sen!2snp!4v1677061556803!5m2!1sen!2snp"
            width="600"
            height="100%"
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit(submitForm)} className=" border p-14">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-black">Full name</span>
                <input
                  type="text"
                  {...register("name")}
                  className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Sudip Kumar Mahato"
                />
              </label>
              <label className="block">
                <span className="text-black">Phone Number</span>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="9741844523"
                  {...register("phone")}
                />
              </label>

              <label className="block">
                <span className="text-black">Select Date</span>
                <input
                  type="date"
                  {...register("date")}
                  className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-black">Select Service</span>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="category"
                  {...register("category")}
                >
                  <option disabled selected>
                    Select your category
                  </option>
                  {category?.data?.map((item, index) => (
                    <option
                      key={index}
                      defaultValue={item?._id}
                      value={item?._id}
                    >
                      {item?.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-black ">Additional details</span>
                <textarea
                  className="mt-1 outline-none p-2 rounded-lg border block w-full  border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                  {...register("details")}
                  defaultValue={""}
                />
              </label>

              <span>
                {" "}
                <input
                  type="checkbox"
                  onChange={(e) => handleChange()}
                  name="pick"
                  id="pick"
                />{" "}
                <label htmlFor="pick">
                  {" "}
                  Do you want pickup and drop service?
                </label>{" "}
              </span>
              {ticked && (
                <input
                  type="text"
                  {...register("address")}
                  ref={inputRef}
                  defaultValue={`${location?.city}, ${location?.country}`}
                  placeholder="Bhatbhateni, Koteshwor"
                />
              )}
              <button
                type="submit"
                className="bg-blue-600 py-2 px-10 w-fit text-white rounded-md cursor-pointerr"
              >
                Request Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApppointmentNavbar;
