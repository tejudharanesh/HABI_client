import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const SelectInput = ({ value, onChange, options, label, name }) => (
  <div className="relative mb-6">
    {label && (
      <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 py-0 text-sm text-gray-400 capitalize">
        {label}*
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      name={name}
      className="text-black block w-full px-3 py-2 md:py-2.5 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const NumberInput = ({ value, onChange, name, label }) => (
  <div className="relative mb-3">
    {label && (
      <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 py-0 text-sm text-gray-400 capitalize">
        {label}*
      </label>
    )}
    <input
      type="number"
      value={value}
      onChange={onChange}
      name={name}
      className="text-black block w-full px-3 py-2 md:py-2.5 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
    />
  </div>
);

function CostEstimator1({ isExpanded }) {
  const [inputs, setInputs] = useState({
    state: localStorage.getItem("state") || "State",
    city: localStorage.getItem("city") || "City",
    locality: localStorage.getItem("locality") || "Locality",
    landType: localStorage.getItem("landType") || "Regular",
    side1: localStorage.getItem("side1") || "",
    side2: localStorage.getItem("side2") || "",
    side3: localStorage.getItem("side3") || "",
    side4: localStorage.getItem("side4") || "",
    length: localStorage.getItem("length") || "20",
    breadth: localStorage.getItem("breadth") || "20",
    customLength: localStorage.getItem("customLength") || "",
    customBreadth: localStorage.getItem("customBreadth") || "",
    floors: localStorage.getItem("floors") || "1",
    floorHeight: localStorage.getItem("floorHeight") || "10",
    packageType: localStorage.getItem("packageType") || "Package",
  });

  const [results, setResults] = useState({
    siteArea: 0,
    builtUpArea: 0,
    sump: 0,
    estimatedCost: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculateArea = () => {
    const {
      side1,
      side2,
      side3,
      side4,
      length,
      breadth,
      customLength,
      customBreadth,
      landType,
    } = inputs;
    const a = parseFloat(side1),
      b = parseFloat(side2),
      c = parseFloat(side3),
      d = parseFloat(side4);

    let area = 0;
    if (landType === "Regular") {
      area =
        (length === "Custom" ? customLength : length) *
        (breadth === "Custom" ? customBreadth : breadth);
    } else if (landType === "Triangular" && side1 && side2 && side3) {
      const s = (a + b + c) / 2;
      area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else if (landType === "Irregular" && side1 && side2 && side3 && side4) {
      const s = (a + b + c + d) / 2;
      area = Math.sqrt((s - a) * (s - b) * (s - c) * (s - d));
    }
    return Math.round(area);
  };

  const calculateCost = () => {
    const area = calculateArea();
    const { floors, packageType } = inputs;
    const groundCoverage = 0.9,
      sumpCost = 5000 * floors;
    const builtUp = Math.round(area * groundCoverage * floors);
    const costMultiplier =
      packageType === "Essential"
        ? 1800
        : packageType === "Premium"
        ? 2075
        : 2485;
    const cost = builtUp * costMultiplier;

    setResults({
      siteArea: area,
      builtUpArea: builtUp,
      sump: sumpCost,
      estimatedCost: cost,
    });
  };

  useEffect(() => {
    calculateCost();
  }, [inputs]);

  useEffect(() => {
    Object.entries(inputs).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }, [inputs]);

  const options = {
    state: ["Karnataka"],
    city: ["Bengaluru"],
    locality: ["KR Puram", "Marathahalli", "Jayanagar"],
    landType: ["Regular", "Triangular", "Irregular"],
    length: ["20", "30", "40", "50", "Custom"],
    breadth: ["20", "30", "40", "50", "Custom"],
    floors: ["1", "2", "3", "4", "5", "6", "7", "8"],
    floorHeight: ["10", "11", "12", "13"],
    packageType: ["Essential", "Premium", "Luxury"],
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-background font-poppins w-full`}
    >
      <div
        className={`w-full bg-layoutColor p-2 px-4 h-auto mb-2 mb:mb-3 ${
          isExpanded
            ? "md:px-20 lg:px-60  xl:px-[300px]"
            : "md:px-12 lg:px-40  xl:px-[300px]"
        }`}
      >
        <h2 className="text-black font-bold text-xl md:text-2xl mb-6 text-center">
          Cost Estimator
        </h2>
        <SelectInput
          value={inputs.state}
          onChange={handleInputChange}
          options={options.state}
          name="state"
          label="State"
        />
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            value={inputs.city}
            onChange={handleInputChange}
            options={options.city}
            name="city"
            label="City"
          />
          <SelectInput
            value={inputs.locality}
            onChange={handleInputChange}
            options={options.locality}
            name="locality"
            label="Locality"
          />
        </div>
        <SelectInput
          value={inputs.landType}
          onChange={handleInputChange}
          options={options.landType}
          name="landType"
          label="Land Type"
        />

        {inputs.landType === "Regular" && (
          <div className="grid grid-cols-2 gap-4 mb-2">
            <SelectInput
              value={inputs.length}
              onChange={handleInputChange}
              options={options.length}
              name="length"
              label="Land dimensions"
            />
            {inputs.length === "Custom" && (
              <NumberInput
                value={inputs.customLength}
                onChange={handleInputChange}
                name="customLength"
                label="Custom length"
              />
            )}
            <SelectInput
              value={inputs.breadth}
              onChange={handleInputChange}
              options={options.breadth}
              name="breadth"
            />
            {inputs.breadth === "Custom" && (
              <NumberInput
                value={inputs.customBreadth}
                onChange={handleInputChange}
                label="Custom breadth"
                name="customBreadth"
              />
            )}
          </div>
        )}

        {inputs.landType === "Triangular" && (
          <div className="grid grid-cols-3 gap-4 mb-3">
            <NumberInput
              value={inputs.side1}
              onChange={handleInputChange}
              placeholder="Side 1"
              name="side1"
              label="Side1"
            />
            <NumberInput
              value={inputs.side2}
              onChange={handleInputChange}
              placeholder="Side 2"
              name="side2"
              label="Side2"
            />
            <NumberInput
              value={inputs.side3}
              onChange={handleInputChange}
              placeholder="Side 3"
              name="side3"
              label="Side3"
            />
          </div>
        )}

        {inputs.landType === "Irregular" && (
          <div className="grid grid-cols-4 gap-4 mb-2">
            <NumberInput
              value={inputs.side1}
              onChange={handleInputChange}
              placeholder="Side 1"
              name="side1"
              label="Side1"
            />
            <NumberInput
              value={inputs.side2}
              onChange={handleInputChange}
              placeholder="Side 2"
              name="side2"
              label="Side2"
            />
            <NumberInput
              value={inputs.side3}
              onChange={handleInputChange}
              placeholder="Side 3"
              name="side3"
              label="Side3"
            />
            <NumberInput
              value={inputs.side4}
              onChange={handleInputChange}
              placeholder="Side 4"
              name="side4"
              label="Side4"
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            value={inputs.floors}
            onChange={handleInputChange}
            options={options.floors}
            name="floors"
            label="No of Floors"
          />
          <SelectInput
            value={inputs.floorHeight}
            onChange={handleInputChange}
            options={options.floorHeight}
            name="floorHeight"
            label="Floor Height"
          />
        </div>
        <SelectInput
          value={inputs.packageType}
          onChange={handleInputChange}
          options={options.packageType}
          name="packageType"
          label="Package"
        />
      </div>

      <div
        className={`items-center w-full bg-layoutColor shadow p-2 flex-grow ${
          isExpanded
            ? "md:px-20 lg:px-60  xl:px-[300px]"
            : "md:px-12 lg:px-40  xl:px-[300px]"
        } flex flex-col`}
      >
        <div className="bg-layoutColor text-black p-4 px-6 rounded-lg mt-4 w-full">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Site Area</span>
            <span className="text-gray-700">{results.siteArea} sq ft</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold text-gray-700">Built-Up Area</span>
            <span className="text-gray-700">{results.builtUpArea} sq ft</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold text-gray-700">Sump Capacity</span>
            <span className="text-gray-700">{results.sump} liters</span>
          </div>
          <hr className="border mx-auto my-2" />
          <div className="flex justify-between mt-2">
            <span className="font-semibold text-gray-700">Estimated Cost</span>
            <span className="text-gray-700">₹{results.estimatedCost}</span>
          </div>
        </div>
        <button
          className="w-full md:w-[50%] bg-primary text-white py-2 mt-6 rounded-lg font-bold"
          onClick={() => {
            navigate("/dashboard/detailedCost", {
              state: {
                sump: results.sump,
                estimatedCost: results.estimatedCost,
                floors: inputs.floors,
                floorHeight: inputs.floorHeight,
                // Add more variables if needed
              },
            });
          }}
        >
          Detailed Report
        </button>

        <Footer />
      </div>
    </div>
  );
}

export default CostEstimator1;
