import React from "react";
import whatsapp from "../../assets/images/Whatsapp.png";
import PaymentBar from "./PaymentBar";
import site from "../../assets/images/site.png";

import { useNavigate } from "react-router-dom";
function TabMiddleLayer() {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="hidden md:inline sticky mt-[89px] lg:mr-10">
        <div
          className="w-[250px] h-[54px] border-2 flex justify-between items-center rounded-xl p-1 pl-2 mb-4 cursor-pointer"
          onClick={() => {
            navigate("/dashboard/payment");
          }}
        >
          <div>
            <p className="text-sm">payment</p>
            <p className="text-sm text-red-400">Due on 05 May</p>
          </div>
          <div>
            <PaymentBar completed={4} />
          </div>
        </div>

        <div
          className="w-[250px] h-[54px] border-2 flex justify-between items-center rounded-xl p-1 pl-2 mb-4 cursor-pointer"
          onClick={() => {
            const phoneNumber = "916366306244";
            const message =
              "Hello, I would like to chat with you about the project.";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`;
            window.open(whatsappUrl, "_blank");
          }}
        >
          <div>
            <p className="text-sm">Chat with our Executive</p>
            <p className="text-sm">Quick Reply</p>
          </div>
          <div className="cursor-pointer">
            <img src={whatsapp} alt="" className="mr-4" />
          </div>
        </div>

        <div className="w-[250px] h-[250px] border-2 justify-between items-center rounded-xl p-2">
          <p className="mb-4">Recent Site Photos</p>
          <div className="grid grid-cols-2 gap-2">
            <img
              src={site}
              alt="Site Photo 1"
              className="w-[99px] h-[69px] object-cover rounded-lg"
            />
          </div>
          <div className="mt-2 text-right">
            <a
              href="#"
              className="text-sm text-primary font-medium flex items-center justify-end"
            >
              view more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabMiddleLayer;
