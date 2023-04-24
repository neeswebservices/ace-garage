import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-not-allowed">
      <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export default Spinner;
