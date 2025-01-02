import React, { useState } from "react";
import upload from "../../assets/svg/upload.svg";

function ImageUpload({ isExpanded }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 4 || selectedFiles.length + files.length > 4) {
      setError("You can upload a maximum of 4 images.");
      return;
    }

    setError("");
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 4)); // Limit to 4 files
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one image to upload.");
      return;
    }

    setError("");

    // Prepare FormData
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("sitePhotos", file);
    });

    // Call backend API
    fetch("/api/upload-site-images", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Images uploaded successfully!");
        setSelectedFiles([]); // Reset state after successful upload
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while uploading images.");
      });
  };

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
            <p className="text-sm text-gray-400">
              JPG, PNG • Up to 10Mb • Max 4 Images
            </p>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              multiple
              accept="image/jpeg, image/png" // Accept only JPG/PNG
              onChange={handleFileChange}
            />
          </div>
        </div>
        {selectedFiles.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-black font-semibold mb-2">
              Selected Images:
            </p>
            <ul className=" text-gray-600">
              {selectedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded-md"
                >
                  <span>{file.name}</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      <div className="flex justify-end">
        <button
          className={`px-7 py-1 rounded-md ${
            selectedFiles.length > 0
              ? "bg-primary text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={selectedFiles.length === 0} // Disable if no files are selected
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
