// src/ToggleButton.js
import React from "react";
import arrow from "../../assets/svg/arrow.svg";

const ToggleButton = ({ collapsed, toggleSidebar }) => {
  return (
    <div
      className={`fixed  md:flex justify-center h-screen hidden z-20 ${
        collapsed ? "mt-6" : "mt-11"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute left-0 w-6 h-6 bg-white text-black rounded-full border-2 border-gray-200 focus:outline-none transform -translate-x-1/2"
      >
        <img
          src={arrow}
          alt=""
          className={`ml-0.5 ${collapsed ? "" : "rotate-180"} w-4 h-3`}
        />
      </button>
    </div>
  );
};

export default ToggleButton;
