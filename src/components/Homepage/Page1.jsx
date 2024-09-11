import React from "react";

function Page1({ handleDateTime, handlePhysicallyClick }) {
  return (
    <div className="border-2 rounded-xl py-5 w-full">
      <h2 className="text-[16px] lg:text-[18px] font-medium mb-3 text-center text-black">
        Connect with Us!
      </h2>
      <div className="flex flex-col justify-center items-center md:flex-row md:space-x-4 lg:space-x-1">
        <button
          className="bg-primary text-white py-3 px-4 rounded-lg mb-2 md:mb-0 w-[275px] md:w-[240px] h-[58px] md:mr-[16px] lg:mr-[74px]"
          onClick={handleDateTime}
        >
          Virtually
        </button>
        <button
          className="bg-primary text-white py-3 px-4 rounded-lg w-[275px] md:w-[240px] h-[58px]"
          onClick={handlePhysicallyClick}
        >
          Physically
        </button>
      </div>
    </div>
  );
}

export default Page1;
