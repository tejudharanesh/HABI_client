import React from "react";
import pdf from "../../assets/images/pdf.png";
import more from "../../assets/images/option.png";

function Design({ isExpanded }) {
  return (
    <div
      className={`flex flex-col w-full bg-layoutColor shadow p-4 h-auto mb-3 ${
        isExpanded ? "md:px-14 lg:px-40" : "md:px-3 lg:px-28"
      }`}
    >
      <p className="text-center font-semibold mb-2 text-black">Design</p>
      <div className="flex justify-between">
        <div className="flex items-center">
          <p className="text-black text-lg mr-2">1. </p>
          <img src={pdf} alt="pdf icon" className="mr-4" />
          <div>
            <p className="text-black text-lg">Initial Layout</p>
            <p className="text-gray-400 text-sm">18 July 2024</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-primaryO text-primary px-2 rounded-md border-[1px] border-primary mr-2">
            version1
          </button>

          <button>
            <img src={more} alt="more" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Design;
