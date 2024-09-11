import React from "react";
import icon from "../../assets/svg/youtube.svg";

function Youtube({ isExpanded }) {
  const thumbnailUrl = `https://img.youtube.com/vi/R3C12M4nG1o/hqdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=R3C12M4nG1o`;
  return (
    <div
      className={`flex flex-col w-full bg-layoutColor shadow p-4 h-auto mb-3 ${
        isExpanded ? "md:px-14 lg:px-40" : "md:px-3 lg:px-28"
      }`}
    >
      {" "}
      <div className="w-full">
        <div className="ml-2 relative">
          <div className="relative inline-block">
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={thumbnailUrl}
                alt="Responsive"
                className="w-[173px] h-[105px] lg:w-[340px] lg:h-[192px] object-cover rounded-xl"
              />
              <img
                src={icon}
                alt="YouTube Icon"
                className="absolute inset-0 m-auto w-7 h-8"
              />
            </a>
          </div>

          <div className="p-2 inline-block absolute -top-2">
            <h3 className="text-sm lg:text-lg font-semibold text-black">
              habi's Story - Redefines Home Building | habi
            </h3>
            <p className="text-xs lg:text-sm">
              “Building Better Homes: Solving Construction Challenges with Tech”
              <span className="hidden md:inline">
                Discover how our startup tackles industry pain points head-on
                using cutting-edge technology. From streamlining processes to
                enhancing safety, we’re revolutionizing home building.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Youtube;
