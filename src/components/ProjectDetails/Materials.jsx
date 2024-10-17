import React from "react";
import steel from "../../assets/images/steel.png";
import { useNavigate } from "react-router-dom";

function Materials({ isExpanded }) {
  const navigate = useNavigate();
  const goToMaterials = () => {
    navigate("/dashboard/materials");
  };
  return (
    <div
      className={`flex flex-col w-full bg-layoutColor shadow h-auto p-2 mb-2 ${
        isExpanded
          ? "md:px-32 lg:px-52 xl:px-[20%]"
          : "md:px-20 lg:px-48 xl:px-[20%]"
      }`}
    >
      <header className="text-center m-2 relative">
        <p className="text-xl font-semibold text-black inline-block">
          Materials
        </p>
        <p className="inline-block absolute right-0 top-1">
          <button onClick={goToMaterials} className="text-primary">
            View more
          </button>
        </p>
      </header>
      <div className="items-center text-black">
        <div className="p-2">
          <div className="inline mr-3">
            <img src={steel} alt="" className="inline" />
          </div>
          <div className="inline-block">
            <p className="">TATA Steel</p>
            <p className="text-sm text-gray-400 ">
              brand TATA, diameter: 32 mm & above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Materials;
