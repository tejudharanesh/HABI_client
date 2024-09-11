import React from "react";
import tick from "../../assets/images/tick.png";

function ScheduleBooked() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-[296px] h-[178px] lg:w-[360px] lg:h-[210px] relative md:ml-48 lg:ml-80">
        <img src={tick} alt="" className="mx-auto mb-2" />
        <p className="text-lg font-medium text-center text-gray-800">
          Your schedule has been successfully booked
        </p>
      </div>
    </div>
  );
}

export default ScheduleBooked;
