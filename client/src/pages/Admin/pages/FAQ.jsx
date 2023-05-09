import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FAQ = () => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value) => {
    // Handle description values
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission with the title and description values
  };

  return (
    <>
      <div className="flex flex-col items-start ml-8">
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex flex-wrap mb-4">
            <label
              htmlFor="faq-title"
              className="block text-gray-700 font-bold mb-2"
            >
              FAQ Title:
            </label>
            <input
              type="text"
              id="faq-title"
              placeholder="How we work?"
              className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex flex-wrap mb-4">
            <label
              htmlFor="faq-description"
              className="block text-black font-bold mb-2"
            >
              Description:
            </label>
            <ReactQuill
              value={description}
              onChange={handleDescriptionChange}
              id="faq-description"
              placeholder="How we work?"
              className="rounded p-2 mb-4"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 mt-11 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create FAQ
          </button>
        </form>
      </div>
    </>
  );
};

export default FAQ;
