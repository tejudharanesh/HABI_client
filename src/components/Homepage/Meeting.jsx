// src/components/Popup.js
import React from "react";
import cancel from "../../assets/svg/cancel.svg";

const Meeting = ({ show, onClose, handleVisitHabi, handleInviteHabi }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-3 rounded-2xl text-center w-[361px] h-[268px] lg:w-[397px] lg:h-[250px] relative md:ml-48 lg:ml-[]">
        <p className="mt-[27px] mb-[8px] text-gray-600 text-[12px] lg:text-[14px]">
          Meet our habi's executive at office.
        </p>
        <button
          className="bg-primary text-white h-[60px] rounded-xl mx-auto w-[279px] lg:w-[315px]"
          onClick={handleVisitHabi}
        >
          Visit habi
        </button>
        <p className="mt-[20px] mb-[8px] text-gray-600 text-[12px] lg:text-[14px]">
          An executive from habi will visit your home.
        </p>
        <button
          className=" bg-primary text-white  h-[60px] rounded-xl mx-auto w-[279px] lg:w-[315px]"
          onClick={handleInviteHabi}
        >
          Invite habi
        </button>
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          <img src={cancel} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Meeting;
