import { useState } from "react";

const CreateEmployee = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [expertise, setExpertise] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Submitted: ${firstName} ${lastName}, ${email}`);
        // Add code to submit form data to server or store in state
    };

    return (
        <div className="flex flex-col items-start ml-8">
            <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="flex flex-wrap mb-4">
                    <label htmlFor="first-name" className="block text-gray-700 font-bold mb-2">
                        First Name:
                    </label>
                    <input
                        type="text"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex flex-wrap mb-4">
                    <label htmlFor="last-name" className="block text-gray-700 font-bold mb-2">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex flex-wrap mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex flex-wrap mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Phone Number:
                    </label>
                    <input
                        type="phonenumber"
                        id="phonenumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex flex-wrap mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Role:
                    </label>
                    <input
                        type="role"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex flex-wrap mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Expertise:
                    </label>
                    <input
                        type="expertise"
                        id="expertise"
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default CreateEmployee;