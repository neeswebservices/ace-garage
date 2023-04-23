import React, { useState } from 'react';

const Appointment = () => {


    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-between px-4 py-2 bg-blue-600">
                <h1 className="text-lg font-semibold text-white">
                    Total Employee
                </h1>
                <button
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-800"
                >
                    Refresh
                </button>
            </div>
            <div className="flex-grow px-4 py-6 overflow-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                ID
                            </th>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                Name
                            </th>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                Service Name
                            </th>



                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                Location
                            </th>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                Phone
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr
                        >

                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                1
                            </td>
                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                Sudip Kumar Mahato
                            </td>
                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                Chain Fitting
                            </td>
                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                Tinkune
                            </td>
                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                9816725300
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Appointment;