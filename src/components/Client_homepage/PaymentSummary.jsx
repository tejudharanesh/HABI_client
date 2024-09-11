import React from "react";

function PaymentSummary({ paidAngle }) {
  return (
    <div className="absolute hidden md:inline w-48 h-60 bg-layoutColor rounded-lg border-2 items-center top-20 right-[3%] lg:right-[10%] xl:right-[20%]">
      <h2 className="text-gray-800 font-semibold m-4 text-center">
        Payment Summary
      </h2>
      <div className="relative w-32 h-32 flex items-center justify-center mx-auto">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#0FB4C3 ${paidAngle}deg, #e5e7eb 0deg 360deg)`,
          }}
        ></div>
        <div className="absolute w-24 h-24 bg-layoutColor rounded-full"></div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center mx-2">
          <span className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></span>
          <span className="text-gray-700 text-sm">Paid</span>
        </div>
        <div className="flex items-center mx-2">
          <span className="w-3 h-3 bg-gray-200 rounded-full mr-2"></span>
          <span className="text-gray-700 text-sm">Unpaid</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
