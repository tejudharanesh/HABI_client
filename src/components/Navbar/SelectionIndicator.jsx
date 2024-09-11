// src/SelectionIndicator.js
import React from "react";

const SelectionIndicator = () => (
  <div className="selection-indicator">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary hidden md:flex rounded-r-md"></div>
    <div className="absolute left-1 top-0 bottom-0 w-3 bg-layoutColor hidden md:flex"></div>
  </div>
);

export default SelectionIndicator;
