import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Loading({ loading }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background font-poppins w-full">
      <PuffLoader color={"#36D7B7"} loading={loading} size={120} />
    </div>
  );
}

export default Loading;
