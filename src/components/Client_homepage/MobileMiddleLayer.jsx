import React from "react";
import whatsapp from "../../assets/images/Whatsapp.png";
import PaymentBar from "./PaymentBar";
import { useNavigate } from "react-router-dom";

function MobileMiddleLayer() {
  const navigate = useNavigate();
  return (
    <div className="pb-2">
      <div className="flex md:hidden">
        <div
          className="w-[99px] h-[54px] mr-[16px] border-2 rounded-xl rounded-l-none p-3 pl-8 cursor-pointer"
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
          <button>
            <img src={whatsapp} alt="whatsapp" />
          </button>
        </div>
        <div
          className="w-[253px] h-[54px] border-2 flex justify-between items-center rounded-xl pb-1 px-2 pl-3 cursor-pointer"
          onClick={() => {
            navigate("/dashboard/payment");
          }}
        >
          <div>
            <p className="text-lg text-black">payment</p>
            <p className="text-sm text-red-400">Due on 05 May</p>
          </div>
          <div>
            <PaymentBar completed={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMiddleLayer;
