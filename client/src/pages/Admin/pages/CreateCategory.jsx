import { useState } from "react";

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState("");




    const handleSubmit = (e) => {
        e.preventDefault();
        // Add code to submit form data to server or store in state
    };

    return (
        <div className="flex flex-col items-start ml-8">
            <h2 className="text-2xl font-bold mb-4">Create Category</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="flex flex-wrap mb-4">
                    <label htmlFor="first-name" className="block text-gray-700 font-bold mb-2">
                        Category Name:
                    </label>
                    <input
                        type="text"
                        id="branchName"
                        placeholder="Basic or Breakdown"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Category
                </button>
            </form>
        </div>
    );
};

export default CreateCategory;