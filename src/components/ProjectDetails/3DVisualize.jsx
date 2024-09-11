import React from "react";
import site from "../../assets/images/site.png";

function DVisualize({ isExpanded }) {
  return (
    <div
      className={`flex flex-col w-full bg-layoutColor shadow h-auto p-2 mb-2 ${
        isExpanded
          ? "md:px-32 lg:px-52 xl:px-[300px]"
          : "md:px-20 lg:px-48 xl:px-[300px]"
      }`}
    >
      <header className="text-center m-2 relative">
        <p className="text-lg font-semibold text-black inline-block">
          3D Visualize
        </p>
        <p className="inline-block absolute right-0 top-1">
          <button className="text-primary">View more </button>
        </p>
      </header>
      <div className="grid grid-cols-4 justify-around items-center">
        <img
          src={site}
          alt="Site Photo 1"
          className="w-[78px] md:w-[100px] h-[75px] object-cover rounded-lg"
        />
        <img
          src={site}
          alt="Site Photo 1"
          className="w-[78px] md:w-[100px] h-[75px] object-cover rounded-lg "
        />
        <img
          src={site}
          alt="Site Photo 1"
          className="w-[78px] md:w-[100px] h-[75px] object-cover rounded-lg"
        />
        <img
          src={site}
          alt="Site Photo 1"
          className="w-[78px] md:w-[100px] h-[75px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default DVisualize;
