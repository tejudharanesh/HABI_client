import React from "react";
import user from "../../assets/images/user.png";
import cost from "../../assets/images/cost.png";
import duration from "../../assets/images/duration.png";
import pincode from "../../assets/images/pincode.png";
import plot from "../../assets/images/Plot.png";
import floor from "../../assets/images/Floor.png";

function Details({ isExpanded }) {
  return (
    <div
      className={`flex flex-col w-full bg-layoutColor shadow h-auto p-2 mb-2 ${
        isExpanded
          ? "md:px-32 lg:px-52 xl:px-[300px]"
          : "md:px-20 lg:px-48 xl:px-[300px]"
      }`}
    >
      <header className="text-center m-2 ">
        <h1 className="text-xl font-semibold text-black">Project Details</h1>
      </header>
      <div className="mt-4">
        <div className="ml-3">
          <img src={user} alt="" className="w-6 h-6 inline-block mr-2" />
          <p className="inline-block text-black font-semibold">Name</p>
          <p className="mb-2 ml-[32px] text-black">Yash</p>
        </div>
        <div className="ml-3">
          <img src={cost} alt="" className="w-6 h-6 inline-block mr-2" />
          <p className="inline-block text-black font-semibold">Project Cost</p>

          <p className="mb-2 ml-[32px] text-black">1.5 crores</p>
        </div>
        <div className="ml-3">
          <img src={duration} alt="" className="w-6 h-6 inline-block mr-2" />
          <p className="inline-block text-black font-semibold">Duration</p>

          <p className="mb-2 ml-[32px] text-black">25 May - 17 Nov 2024</p>
        </div>
        <hr className="mt-2 w-[90%] mx-auto" />

        <div className="flex items-center justify-between space-x-4 text-black mt-3 px-3">
          <div>
            <img src={pincode} alt="" className="w-6 h-6 inline-block mr-2" />

            <p className="inline-block">560109</p>
          </div>
          <div>
            <img src={plot} alt="" className="w-6 h-6 inline-block mr-2" />

            <p className="inline-block">1200 Sq. ft</p>
          </div>
          <div>
            <img src={floor} alt="" className="w-6 h-6 inline-block mr-2" />

            <p className="inline-block">G+2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
