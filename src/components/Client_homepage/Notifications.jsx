import React from "react";
import cancel from "../../assets/svg/cancel.svg";

function Notifications({ onClose }) {
  const notifications = [
    {
      icon: "path/to/icon1.png",
      title: "Soil Testing is Currently Underway on Site",
      date: "25 May 24",
    },
    {
      icon: "path/to/icon1.png",
      title: "Soil Testing is Currently Underway on Site",
      date: "25 May 24",
    },
    {
      icon: "path/to/icon1.png",
      title: "Soil Testing is Currently Underway on Site",
      date: "25 May 24",
    },
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
      <div className="bg-white p-3 rounded-2xl shadow-lg text-center w-[313px] md:w-[450px] relative md:ml-48 lg:ml-[]">
        <p className="text-black font-semibold text-lg">Notifications</p>

        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b last:border-none mt-3 md:px-5"
          >
            <div className="flex items-center ml-2">
              <img
                src={notification.icon}
                alt="Notification Icon"
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3 w-2/3 text-start">
                <p className="text-sm font-medium">{notification.title}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400 w-20">
              {notification.date}
            </div>
          </div>
        ))}

        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          <img src={cancel} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Notifications;
