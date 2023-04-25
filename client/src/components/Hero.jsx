import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import getAPI from "../api/getApi.js";
import Spinner from "./common/Spinner";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const Hero = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data, isLoading, error, refetch } = useQuery(["branch"], () =>
    getAPI.getBranches()
  );
  const options = data
    ? data.data.reduce((acc, cur) => {
        acc.push({
          value: cur._id,
          label: `${cur.city}, ${cur.address}`,
          ...cur,
        });
        return acc;
      }, [])
    : [];

  const submitForm = (data) => {
    if (!selectedOption) {
      return toast.error("Please select branch!");
    }
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className="bg-white ml-6 mt-[-100px]">
      <div className="flex items-center max-h-[100vh] h-screen">
        <div className=" px-8 w-1/2">
          <div className="text-7xl text-gray-900 font-semibold">
            <h1>Building digital</h1>
            <h1>products, brands</h1>
            <h1 className="text-blue-600">experience</h1>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
              similique nam fugit veritatis quos expedita quidem maxime at quas
              voluptatum, architecto maiores excepturi. Quos quia, magnam
              accusamus quasi impedit necessitatibus.
            </p>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <form
              onSubmit={handleSubmit(submitForm)}
              className="mt-4 flex items-center space-x-4"
            >
              <Select
                classNamePrefix="select"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "blue" : "grey",
                    width: "400px",
                  }),
                }}
                onChange={handleSelectChange}
                // defaultValue={options[0]}
                value={selectedOption}
                isSearchable={true}
                options={options}
                // {...register("branch")}
                placeholder="Select the branch..."
              />
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white"
              >
                Search
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
