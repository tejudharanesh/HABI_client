import React from "react";
import site from "../../assets/images/site.png";
import { useNavigate } from "react-router-dom";

function Gallery({ isExpanded }) {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/dashboard/gallery");
  };

  const containerClasses = `flex flex-col w-full bg-layoutColor shadow h-auto p-2 pb-4 ${
    isExpanded
      ? "md:px-32 lg:px-52 xl:px-[300px]"
      : "md:px-20 lg:px-48 xl:px-[300px]"
  }`;

  const imageClasses = "w-[78px] md:w-[100px] h-[75px] object-cover rounded-lg";

  return (
    <div className={containerClasses}>
      <header className="text-center m-2 relative">
        <p className="text-xl font-semibold text-black inline-block">Gallery</p>
      </header>
      <div className="grid grid-cols-4 justify-around items-center">
        {[...Array(3)].map((_, index) => (
          <img
            key={index}
            src={site}
            alt={`Site Photo ${index + 1}`}
            className={imageClasses}
          />
        ))}
        <button
          onClick={onButtonClick}
          className="relative w-[78px] md:w-[100px] h-[75px]"
        >
          <img src={site} alt="Site Photo 4" className={imageClasses} />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm bg-black bg-opacity-50 rounded-lg">
            20+
          </span>
        </button>
      </div>
    </div>
  );
}

export default Gallery;
