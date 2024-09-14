import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CostEstimator1({ isExpanded }) {
  const [state, setState] = useState(localStorage.getItem("state") || "State");
  const [city, setCity] = useState(localStorage.getItem("city") || "City");
  const [locality, setLocality] = useState(
    localStorage.getItem("locality") || "Locality"
  );
  const [length, setLength] = useState(localStorage.getItem("length") || "20");
  const [breadth, setBreadth] = useState(
    localStorage.getItem("breadth") || "20"
  );
  const [customLength, setCustomLength] = useState("");
  const [customBreadth, setCustomBreadth] = useState("");
  const [floors, setFloors] = useState(localStorage.getItem("floors") || "");
  const [floorHeight, setFloorHeight] = useState(
    localStorage.getItem("floorHeight") || "Floor Height"
  );
  const [packageType, setPackageType] = useState(
    localStorage.getItem("packageType") || "Package"
  );

  const [siteArea, setSiteArea] = useState(0);
  const [builtUpArea, setBuiltUpArea] = useState(0);
  const [sump, setSump] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const navigate = useNavigate();

  const CalculateCost = () => {
    const lengthValue = length === "Custom" ? customLength : length;
    const breadthValue = breadth === "Custom" ? customBreadth : breadth;

    const area = lengthValue * breadthValue;
    const groundCoverage = 0.9;
    const builtUp = area * groundCoverage * floors;
    const sumpCost = 5000 * floors;

    let costMultiplier = 0;
    if (packageType === "Essential") costMultiplier = 1825;
    else if (packageType === "Premium") costMultiplier = 2075;
    else if (packageType === "Luxury") costMultiplier = 2485;

    const cost = builtUp * costMultiplier;

    setSiteArea(area);
    setBuiltUpArea(builtUp);
    setSump(sumpCost);
    setEstimatedCost(cost);
  };

  useEffect(() => {
    CalculateCost();
  }, [length, breadth, floors, packageType, customLength, customBreadth]);

  useEffect(() => {
    localStorage.setItem("state", state);
    localStorage.setItem("city", city);
    localStorage.setItem("locality", locality);
    localStorage.setItem("length", length);
    localStorage.setItem("breadth", breadth);
    localStorage.setItem("floors", floors);
    localStorage.setItem("floorHeight", floorHeight);
    localStorage.setItem("packageType", packageType);
  }, [
    state,
    city,
    locality,
    length,
    breadth,
    floors,
    floorHeight,
    packageType,
  ]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("state");
      localStorage.removeItem("city");
      localStorage.removeItem("locality");
      localStorage.removeItem("length");
      localStorage.removeItem("breadth");
      localStorage.removeItem("floors");
      localStorage.removeItem("floorHeight");
      localStorage.removeItem("packageType");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col  bg-background font-poppins w-full h-full">
      <div
        className={`items-center w-full bg-layoutColor shadow p-2 h-auto mb-3 ${
          isExpanded ? "md:px-20 lg:px-60" : "md:px-12 lg:px-40"
        }`}
      >
        <h2 className="text-black font-bold text-2xl mb-6 text-center">
          Cost Estimator
        </h2>

        {/* State Selection */}
        <div className="mb-4">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
          >
            <option>State</option>
            <option>Karnataka</option>
          </select>
        </div>

        {/* City Selection */}
        <div className="mb-4">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
          >
            <option>City</option>
            <option>Bengaluru</option>
          </select>
        </div>

        {/* Locality Selection */}
        <div className="mb-4">
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
          >
            <option>Locality</option>
            <option>KR Puram</option>
            <option>Marathahalli</option>
            <option>Jayanagar</option>
          </select>
        </div>

        {/* Land Dimensions */}
        {/* Land Dimensions with datalist */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Land Dimensions (in feet)
          </label>
          <div className="flex space-x-4">
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
            >
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="Custom">Custom</option>
            </select>
            {length === "Custom" && (
              <input
                type="number"
                value={customLength}
                onChange={(e) => setCustomLength(e.target.value)}
                placeholder="Enter custom length"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
            )}

            <select
              value={breadth}
              onChange={(e) => setBreadth(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
            >
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="Custom">Custom</option>
            </select>
            {breadth === "Custom" && (
              <input
                type="number"
                value={customBreadth}
                onChange={(e) => setCustomBreadth(e.target.value)}
                placeholder="Enter custom breadth"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
            )}
          </div>
        </div>

        {/* Number of Floors */}
        <div className="mb-4">
          <select
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
          >
            <option>No. of Floors</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>

        {/* Floor Height */}
        <div className="mb-4">
          <select
            value={floorHeight}
            onChange={(e) => setFloorHeight(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
          >
            <option>Floor Height</option>
            <option>10</option>

            <option>11</option>
            <option>12</option>
            <option>13</option>
          </select>
        </div>

        {/* Package Selection */}
        <div className="mb-4">
          <select
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
          >
            <option>Package</option>
            <option>Essential</option>
            <option>Premium</option>
            <option>Luxury</option>
          </select>
        </div>

        {/* Submit Button */}
      </div>
      <div
        className={`items-center w-full bg-layoutColor shadow p-2 h-auto mb-3 ${
          isExpanded ? "md:px-20 lg:px-60" : "md:px-12 lg:px-40"
        }`}
      >
        {" "}
        <div className="bg-layoutColor text-black p-4 px-6 rounded-lg mt-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Site Area</span>
            <span className="text-gray-700">{siteArea} sq ft</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold text-gray-700">Built-Up Area</span>
            <span className="text-gray-700">{builtUpArea} sq ft</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold text-gray-700">Sump Capacity</span>
            <span className="text-gray-700">{sump}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold text-gray-700">Estimated Cost</span>
            <span className="text-gray-700 ">₹{estimatedCost}</span>
          </div>
        </div>
        <button
          className="w-full bg-primary text-white py-2 mt-6 rounded-lg font-bold"
          onClick={() => {
            navigate("/dashboard/detailedCost", {
              state: {
                sump,
                estimatedCost,
                floors,
                floorHeight,
                // Add more variables if needed
              },
            });
          }}
        >
          Detailed Report
        </button>
      </div>
    </div>
  );
}

export default CostEstimator1;
