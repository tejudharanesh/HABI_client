import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import whatsapp from "../../assets/images/Whatsapp.png";
import site from "../../assets/images/site.png";
import PaymentBar from "./PaymentBar";

function Page2() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="md:px-[8%] lg:px-[] xl:px-[] bg-layoutColor h-auto">
        <div className="text-gray-500 m-5 md:hidden ">25 May 2024</div>

        <div className="flex flex-col md:flex-row">
          {/* Payment and Chat for small screens */}
          <div className="flex md:hidden">
            <div className="w-[99px] h-[54px] mr-[16px] border-2 rounded-xl rounded-l-none p-3 pl-8">
              <button
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
                <img src={whatsapp} alt="whatsapp" />
              </button>
            </div>
            <div
              className="w-[253px] h-[54px] border-2 flex justify-between items-center rounded-xl p-1 pl-2"
              onClick={() => {
                navigate("/dashboard/payment");
              }}
            >
              <div>
                <p className="text-sm text-black font-semibold">payment</p>
                <p className="text-sm text-red-400">Due on 05 May 2024</p>
              </div>
              <div>
                <PaymentBar completed={3} />
              </div>
            </div>
          </div>

          {/* Left Panel */}
          <div className="flex-1 pr-2 pl-4 md:pl-0">
            <div className="relative">
              <div className="absolute top-0 left-0 h-full border-l-2 border-gray-300"></div>
              <div className="text-gray-500 m-3 hidden md:inline-block">
                25 May 2024
              </div>

              {/* Ongoing Section */}
              <div className="mb-10">
                <p className="p-2 text-black ">Ongoing</p>

                <div>
                  <div
                    onClick={toggleExpand}
                    className="relative bg-layoutColor p-4 rounded-3xl rounded-tl-none border-2 md:w-[100%] lg:w-[90%]"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">Soil Testing</h3>
                      <p>Started</p>
                    </div>
                    <p className="text-sm text-black">initial stage</p>
                    <p className="text-sm text-gray-500 inline mr-2">
                      25 May 2024 - 26 May 2024
                    </p>
                    <p className="text-red-400 inline text-sm">2 days delay</p>
                    <div className="bg-red-400 w-1 h-1 rounded inline-block mb-0.5 ml-0.5"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-3 bg-gray-200 rounded-full mt-2 w-[80%] inline-block">
                        <div
                          className="h-3 bg-primary rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                      <p className="inline text-black text-sm">70%</p>
                    </div>

                    <div className="flex items-center absolute -top-3 -left-3 rounded-full bordlg border-primary p-0.5">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                    {isExpanded && (
                      <div>
                        <div>
                          <img
                            src={site}
                            alt="Site Photo 1"
                            className="w-[90px] h-[69px] object-cover rounded-lg inline-block"
                          />
                          <img
                            src={site}
                            alt="Site Photo 1"
                            className="w-[90px] h-[69px] object-cover rounded-lg inline-block m-2"
                          />
                          <img
                            src={site}
                            alt="Site Photo 1"
                            className="w-[90px] h-[69px] object-cover rounded-lg inline-block"
                          />
                        </div>
                        <div className="mt-4">
                          <button className="px-4 py-2 border-red-400 border rounded-lg text-red-400 bg-red-50 w-[155px]">
                            Reject
                          </button>
                          <button className="px-4 py-2 text-white bg-primary rounded-lg ml-3 w-[155px]">
                            Approve
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-10">
                <p className="m-2 text-black">Upcoming</p>
                <div className="relative bg-layoutColor p-4 rounded-3xl rounded-tl-none border-2 md:w-[100%] lg:w-[90%]">
                  <h3 className="font-bold text-gray-800">Slabs</h3>
                  <p className="text-sm text-gray-500">initial stage</p>
                  <p className="text-sm text-gray-500">
                    25 May 2024 - 26 May 2024
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full mt-2 w-[60%]">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <div className="flex items-center absolute -top-2 -left-2">
                    <div className="w-5 h-5 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Upcoming Section */}
            </div>
          </div>

          {/* Payment and Chat for medium and larger screens */}
          <div className="hidden md:block mt-[85px] lg:mr-10">
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

            <div className="w-[250px] h-[54px] border-2 flex justify-between items-center rounded-xl p-1 pl-2 mb-4">
              <div>
                <p className="text-sm">Chat with our Executive</p>
                <p className="text-sm">Quick Reply</p>
              </div>
              <div
                className="cursor-pointer"
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
                <img
                  src={site}
                  alt="Site Photo 1"
                  className="w-[99px] h-[69px] object-cover rounded-lg"
                />
                <img
                  src={site}
                  alt="Site Photo 1"
                  className="w-[99px] h-[69px] object-cover rounded-lg"
                />
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
      </div>
    </div>
  );
}

export default Page2;
