import React from 'react';

const CreateSparePart = () => {




    return (
        <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <h1 className="text-center font-bold text-2xl"> Add Spare Parts</h1>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                >
                    Spare Part Name
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Spare Part Name"
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="price"
                >
                    Price
                </label>
                <input
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Spare Part Price"
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Spare Part Description"
                ></textarea>
            </div>



            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="image"
                >
                    Image
                </label>
                <input
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="image"
                    type="file"
                    multiple
                    accept="image/*"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Add Spare Parts
                </button>
            </div>
        </form>
    );
};
export default CreateSparePart;