import React from "react";
import { useNavigate } from "react-router-dom";

function Testing() {
  const navigate = useNavigate();
  const handleClick = (user) => {
    localStorage.setItem("userType", user); // Store user in local storage
    navigate("/dashboard");
  };

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <div>
        <button
          onClick={() => handleClick("new")}
          className="w-40 py-3 m-2 bg-blue-500 text-white rounded block"
        >
          New user
        </button>
        <button
          onClick={() => handleClick("client")}
          className="w-40 py-3 m-2 bg-red-500 text-white rounded"
        >
          Client
        </button>
      </div>
    </div>
  );
}

export default Testing;
