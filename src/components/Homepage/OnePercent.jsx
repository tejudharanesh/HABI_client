import React from "react";
import rupee from "../../assets/images/rupee.png";
import arrow from "../../assets/svg/arrow.svg";

function OnePercent({ isExpanded }) {
  return (
    <div
      className={`flex flex-col items-center w-full bg-layoutColor shadow p-2 h-auto mb-3 ${
        isExpanded
          ? "md:px-14 lg:px-40 xl:px-[20%]"
          : "md:px-3 lg:px-28 xl:px-[20%]"
      }`}
    >
      <div className="rounded-xl w-full px- py-1">
        <div className="flex justify-between items-center py-2 cursor-pointer">
          <span className="flex items-center">
            <img src={rupee} alt="" />
            <span className="ml-3.5 text-black text-[16px]">
              Pay the 1% token Amount to proceed
            </span>
          </span>
          <button>
            <img src={arrow} className="md:mr-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnePercent;
