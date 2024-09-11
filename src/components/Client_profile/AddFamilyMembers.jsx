import React from "react";
import cancel from "../../assets/svg/cancel.svg";

function AddFamilyMembers({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-3 rounded-2xl shadow-lg text-center w-[361px] h-[404px] lg:w-[416px] lg:h-[444px] relative md:ml-48">
        <p className="text-black font-medium text-lg">Invite Family Members</p>
        <form className="mt-10 space-y-7 w-full px-4 md:px-0">
          {["Name", "Phone Number", "Email ID"].map((label, idx) => (
            <div key={idx} className="relative mb-5">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-grey">
                {label}
              </label>
              <input
                type="text"
                placeholder={
                  label === "Name"
                    ? "Teju"
                    : label === "Phone Number"
                    ? "+91 8431497190"
                    : "teju@gmail.com"
                }
                className="text-black block w-full px-3 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none"
              />
            </div>
          ))}
          <button className="bg-primary w-full h-[51px] rounded-2xl text-white">
            Send Invite
          </button>
        </form>
        <button
          className="absolute top-5 right-5 text-gray-500"
          onClick={onClose}
        >
          <img src={cancel} alt="Cancel" />
        </button>
      </div>
    </div>
  );
}

export default AddFamilyMembers;
