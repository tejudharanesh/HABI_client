import React from "react";
import location from "../../assets/images/Location.png";

function Page3({ onReschedule, selectedDateTime }) {
  return (
    <div className="border-2 rounded-xl py-5 w-full">
      <h2 className="text-[16px] lg:text-[18px] font-medium mb-2 text-center text-black">
        we're waiting for you!
      </h2>
      <p className="text-black text-center">
        {selectedDateTime.date} @ {selectedDateTime.time}
      </p>
      <div className="flex flex-col justify-center items-center md:flex-row md:space-x-4 lg:space-x-1">
        <a href="https://maps.app.goo.gl/hqQVAC1Q7oz8XMbX7" target="_blank">
          <button className="text-white rounded-lg mb-2 md:mb-0 w-[275px] md:w-[240px] h-[128px] md:mr-[16px] lg:mr-[74px]">
            <img src={location} alt="Location" />
          </button>
        </a>
        <button
          className="bg-primaryO text-primary py-3 rounded-lg w-[275px] md:w-[240px] h-[58px] border-2 border-primary1"
          onClick={onReschedule}
        >
          Reschedule
        </button>
      </div>
    </div>
  );
}

export default Page3;
