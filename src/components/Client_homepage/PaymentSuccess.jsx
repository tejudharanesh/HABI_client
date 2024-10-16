import React, { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import tick from "../../assets/images/rightTick.png";

function PaymentSuccess() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout of 1 second (1000 ms) to simulate the loading/spinner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background font-poppins w-full">
      {loading ? (
        <div className="spinner">
          <PuffLoader color={"#36D7B7"} loading={loading} size={120} />
        </div>
      ) : (
        <div>
          <img src={tick} alt="" className="mx-auto w-28 mb-5" />
          <h1 className="font-bold text-2xl text-green-500">
            Payment Successful
          </h1>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
