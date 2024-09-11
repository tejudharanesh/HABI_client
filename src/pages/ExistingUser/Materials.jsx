import React, { useEffect } from "react";
import steel from "../../assets/images/steel.png";
import back from "../../assets/images/back.png";
import { useNavigate } from "react-router-dom";

function Materials({ isExpanded }) {
  const navigate = useNavigate();
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-poppins w-full bg-background h-auto">
      <div
        className={`flex flex-col w-full bg-layoutColor h-screen pt-2 ${
          isExpanded
            ? "md:px-40 lg:px-52 xl:px-[300px]"
            : "md:px-20 lg:px-48 xl:px-[300px]"
        }`}
      >
        <button
          className="absolute top-6 left-4 md:hidden"
          onClick={() => navigate(-1)}
        >
          <img src={back} alt="" />
        </button>
        <header className="text-center m-2 ">
          <h1 className="text-xl font-semibold text-black">materials</h1>
        </header>

        <div>
          <div className="p-2">
            <div className="inline-block mr-4">
              <img src={steel} alt="" />
            </div>
            <div className="inline-block">
              <p className="font-semibold">TATA Steel</p>
              <p className="text-sm text-gray-400  ">
                brand TATA, diameter: 32 mm & above
              </p>
              <p className="text-sm text-gray-400  ">
                single piece 12 meter...
              </p>
            </div>
            <hr className="mt-2" />
          </div>
          <div className="p-2">
            <div className="inline-block mr-4">
              <img src={steel} alt="" />
            </div>
            <div className="inline-block">
              <p className="font-semibold">TATA Steel</p>
              <p className="text-sm text-gray-400  ">
                brand TATA, diameter: 32 mm & above
              </p>
              <p className="text-sm text-gray-400  ">
                single piece 12 meter...
              </p>
            </div>
            <hr className="mt-2" />
          </div>
          <div className="p-2">
            <div className="inline-block mr-4">
              <img src={steel} alt="" />
            </div>
            <div className="inline-block">
              <p className="font-semibold">TATA Steel</p>
              <p className="text-sm text-gray-400  ">
                brand TATA, diameter: 32 mm & above
              </p>
              <p className="text-sm text-gray-400  ">
                single piece 12 meter...
              </p>
            </div>
            <hr className="mt-2" />
          </div>
          <div className="p-2">
            <div className="inline-block mr-4">
              <img src={steel} alt="" />
            </div>
            <div className="inline-block">
              <p className="font-semibold">TATA Steel</p>
              <p className="text-sm text-gray-400">
                brand TATA, diameter: 32 mm & above
              </p>
              <p className="text-sm text-gray-400">single piece 12 meter...</p>
            </div>
            <hr className="mt-2" />
          </div>
          <div className="p-2">
            <div className="inline-block mr-4">
              <img src={steel} alt="" />
            </div>
            <div className="inline-block">
              <p className="font-semibold">TATA Steel</p>
              <p className="text-sm text-gray-400  ">
                brand TATA, diameter: 32 mm & above
              </p>
              <p className="text-sm text-gray-400  ">
                single piece 12 meter...
              </p>
            </div>
            <hr className="mt-2" />
          </div>
          <div className="p-2">
            <div className="inline-block mr-4">
              <img src={steel} alt="" />
            </div>
            <div className="inline-block">
              <p className="font-semibold">TATA Steel</p>
              <p className="text-sm text-gray-400  ">
                brand TATA, diameter: 32 mm & above
              </p>
              <p className="text-sm text-gray-400  ">
                single piece 12 meter...
              </p>
            </div>
            <hr className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Materials;
