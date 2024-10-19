import React, { useState, useEffect } from "react";
import tick from "../../assets/images/rightTick.png";
import Loading from "../Loading/Loading";

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
        <Loading loading={loading} /> // Render the loading component
      ) : (
        <div>
          <img src={tick} alt="" className="mx-auto w-40 mb-5" />
          <h1 className="font-bold text-3xl text-green-500">
            Payment Successful
          </h1>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
