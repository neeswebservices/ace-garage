import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import getAPI from "../api/getApi.js";
import Spinner from "./common/Spinner";

export const Hero = () => {
  const { data, isLoading, error, refetch } = useQuery(["branch"], () =>
    getAPI.getBranches()
  );
  const options = data
    ? data.data.reduce((acc, cur) => {
        acc.push({
          value: `${cur.city}, ${cur.address}`,
          label: cur.name,
          ...cur,
        });
        return acc;
      }, [])
    : [];

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
            <div className="mt-4 flex items-center space-x-4">
              <Select
                classNamePrefix="select"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "blue" : "grey",
                    width: "300px",
                  }),
                }}
                defaultValue={options[0]}
                isSearchable={true}
                name="branch"
                options={options}
                placeholder="Select the branch..."
              />
              <button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
