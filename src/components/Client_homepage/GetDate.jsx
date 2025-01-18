import React from "react";

function GetDate() {
  const date = new Date();

  return (
    <div className="text-gray-500 mx-10 my-3">
      {date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </div>
  );
}

export default GetDate;
