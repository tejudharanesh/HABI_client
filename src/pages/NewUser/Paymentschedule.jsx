import React from "react";

const PaymentSchedule = ({ scheduleData }) => {
  return (
    <div className="container mx-auto my-8 text-black">
      <h1 className="text-center text-2xl font-bold">Payment Schedules</h1>
      <div className="border border-gray-300 mt-4">
        {scheduleData.map((schedule, index) => (
          <div key={index} className="flex border-b">
            <div className="w-3/5 p-4 border-r">
              <h2 className="font-bold">{schedule.title}</h2>
              <ul className="list-disc list-inside">
                {schedule.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="w-1/5 p-4 border-r flex items-center justify-center">
              <span className="text-lg font-bold">{schedule.percentage}%</span>
            </div>
            <div className="w-1/5 p-4 flex items-center justify-center">
              <span className="text-lg font-bold">
                ₹{schedule.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
        <div className="flex">
          <div className="w-3/4 p-4 border-t border-gray-300 font-bold text-right">
            TOTAL
          </div>
          <div className="w-1/4 p-4 border-t border-l font-bold flex items-center justify-center">
            ₹
            {scheduleData
              .reduce((acc, schedule) => acc + schedule.price, 0)
              .toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSchedule;
