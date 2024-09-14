import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CostEstimator1({ isExpanded }) {
  const [state, setState] = useState(localStorage.getItem("state") || "State");
  const [city, setCity] = useState(localStorage.getItem("city") || "City");
  const [locality, setLocality] = useState(
    localStorage.getItem("locality") || "Locality"
  );
  const [landType, setLandType] = useState(
    localStorage.getItem("landType") || "Regular"
  );
  const [side1, setSide1] = useState(localStorage.getItem("side1") || "");
  const [side2, setSide2] = useState(localStorage.getItem("side2") || "");
  const [side3, setSide3] = useState(localStorage.getItem("side3") || "");
  const [side4, setSide4] = useState(localStorage.getItem("side4") || "");
  const [length, setLength] = useState(localStorage.getItem("length") || "20");
  const [breadth, setBreadth] = useState(
    localStorage.getItem("breadth") || "20"
  );
  const [customLength, setCustomLength] = useState(
    localStorage.getItem("customLength") || ""
  );
  const [customBreadth, setCustomBreadth] = useState(
    localStorage.getItem("customBreadth") || ""
  );
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

  // Function to calculate the area of a cyclic quadrilateral
  const calculateQuadrilateralArea = () => {
    const a = parseFloat(side1);
    const b = parseFloat(side2);
    const c = parseFloat(side3);
    const d = parseFloat(side4);

    // Semi-perimeter
    const s = (a + b + c + d) / 2;

    // Brahmagupta's formula for area of cyclic quadrilateral
    return Math.round(Math.sqrt((s - a) * (s - b) * (s - c) * (s - d)));
  };

  // Function to calculate the area of a triangle using Heron's formula
  const calculateTriangleArea = () => {
    const a = parseFloat(side1);
    const b = parseFloat(side2);
    const c = parseFloat(side3);

    // Semi-perimeter
    const s = (a + b + c) / 2;

    // Heron's formula for area of a triangle
    return Math.round(Math.sqrt(s * (s - a) * (s - b) * (s - c)));
  };

  const CalculateCost = () => {
    let area = 0;
    if (landType === "Regular") {
      const lengthValue = length === "Custom" ? customLength : length;
      const breadthValue = breadth === "Custom" ? customBreadth : breadth;
      area = lengthValue * breadthValue;
    } else if (landType === "Triangular") {
      if (side1 && side2 && side3) {
        area = calculateTriangleArea();
      }
    } else if (landType === "Irregular") {
      if (side1 && side2 && side3 && side4) {
        area = calculateQuadrilateralArea();
      }
    }

    const groundCoverage = 0.9;
    const builtUp = area * groundCoverage * floors;
    const sumpCost = 5000 * floors;

    let costMultiplier = 0;
    if (packageType === "Essential") costMultiplier = 1800;
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
  }, [
    length,
    breadth,
    customLength,
    customBreadth,
    floors,
    packageType,
    side1,
    side2,
    side3,
    side4,
    landType,
  ]);

  useEffect(() => {
    localStorage.setItem("state", state);
    localStorage.setItem("city", city);
    localStorage.setItem("locality", locality);
    localStorage.setItem("landType", landType);
    localStorage.setItem("side1", side1);
    localStorage.setItem("side2", side2);
    localStorage.setItem("side3", side3);
    localStorage.setItem("side4", side4);
    localStorage.setItem("length", length);
    localStorage.setItem("breadth", breadth);
    localStorage.setItem("customLength", customLength);
    localStorage.setItem("customBreadth", customBreadth);
    localStorage.setItem("floors", floors);
    localStorage.setItem("floorHeight", floorHeight);
    localStorage.setItem("packageType", packageType);
  }, [
    state,
    city,
    locality,
    landType,
    side1,
    side2,
    side3,
    side4,
    length,
    breadth,
    customLength,
    customBreadth,
    floors,
    floorHeight,
    packageType,
  ]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("state");
      localStorage.removeItem("city");
      localStorage.removeItem("locality");
      localStorage.removeItem("landType");
      localStorage.removeItem("side1");
      localStorage.removeItem("side2");
      localStorage.removeItem("side3");
      localStorage.removeItem("side4");
      localStorage.removeItem("length");
      localStorage.removeItem("breadth");
      localStorage.removeItem("customLength");
      localStorage.removeItem("customBreadth");
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
    <div className="min-h-screen flex flex-col bg-background font-poppins w-full h-full">
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

        {/* Land Type Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Land Type
          </label>
          <select
            value={landType}
            onChange={(e) => setLandType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
          >
            <option value="Regular">Regular</option>
            <option value="Triangular">Triangular</option>
            <option value="Irregular">Irregular</option>
          </select>
        </div>

        {/* Land Dimensions */}
        {landType === "Regular" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Land Dimensions (in feet)
            </label>
            <div className="grid grid-cols-2 gap-4">
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
                  placeholder="Custom Length"
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
                  placeholder="Custom Breadth"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
                />
              )}
            </div>
          </div>
        )}

        {landType === "Triangular" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Triangle Sides (in feet)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={side1}
                onChange={(e) => setSide1(e.target.value)}
                placeholder="Side 1"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
              <input
                type="number"
                value={side2}
                onChange={(e) => setSide2(e.target.value)}
                placeholder="Side 2"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
              <input
                type="number"
                value={side3}
                onChange={(e) => setSide3(e.target.value)}
                placeholder="Side 3"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
            </div>
          </div>
        )}

        {landType === "Irregular" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quadrilateral Sides (in feet)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={side1}
                onChange={(e) => setSide1(e.target.value)}
                placeholder="Side 1"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
              <input
                type="number"
                value={side2}
                onChange={(e) => setSide2(e.target.value)}
                placeholder="Side 2"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
              <input
                type="number"
                value={side3}
                onChange={(e) => setSide3(e.target.value)}
                placeholder="Side 3"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
              <input
                type="number"
                value={side4}
                onChange={(e) => setSide4(e.target.value)}
                placeholder="Side 4"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring bg-layoutColor text-black"
              />
            </div>
          </div>
        )}

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
