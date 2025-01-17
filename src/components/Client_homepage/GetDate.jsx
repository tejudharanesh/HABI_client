import React from "react";

function GetDate() {
  const date = new Date();

  return (
    <div className="text-gray-500 m-5 ">
      {date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </div>
  );
}

export default GetDate;
