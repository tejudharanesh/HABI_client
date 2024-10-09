import React from "react";
import upload from "../../assets/svg/upload.svg";

function ImageUpload({ isExpanded }) {
  return (
    <div
      className={`flex flex-col w-full bg-layoutColor shadow p-4 h-auto mb-2 md:mb-3 ${
        isExpanded
          ? "md:px-20 lg:px-40 xl:px-[300px]"
          : "md:px-32 lg:px-28 xl:px-[300px]"
      }`}
    >
      <p className="text-center font-semibold text-black">Upload Site Images</p>
      <p className="text-center text-xs mb-4 text-gray-400 italic">
        To provide a better design based on your needs
      </p>
      <div className="items-center">
        <div className="relative mb-4 lg:mb-6">
          <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-black">
            Attach Files
          </label>
          <div className="h-24 border border-dashed border-gray-300 p-4 rounded-xl flex flex-col items-center justify-center text-center bg-layoutColor text-white">
            <img src={upload} alt="Upload" />
            <p className="text-sm text-gray-400">JPG, PNG, PDF • Up to 10Mb</p>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              multiple // Allow multiple file uploads
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-primary1 text-white px-7 rounded-md py-1">
          Submit
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
