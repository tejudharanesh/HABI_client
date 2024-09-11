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
              <button>
                <img src={whatsapp} alt="whatsapp" />
              </button>
            </div>
            <div
              className="w-[267px] h-[54px] border-2 flex justify-between items-center rounded-xl p-1 pl-2"
              onClick={() => {
                navigate("/dashboard/payment");
              }}
            >
              <div>
                <p className="text-sm text-black font-semibold">payment</p>
                <p className="text-sm">Due on 05 May 2024</p>
              </div>
              <div>
                <PaymentBar completed={3} />
              </div>
            </div>
          </div>

          {/* Left Panel */}
          <div className="flex-1 pr-3 pl-6 md:pl-0">
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
                    className="relative bg-layoutColor p-4 rounded-3xl rounded-tl-none border-2 md:w-[100%] lg:w-[80%]"
                  >
                    <h3 className="font-bold text-gray-800">Soil Testing</h3>
                    <p className="text-sm text-gray-500">initial stage</p>
                    <p className="text-sm text-gray-500">
                      25 May 2024 - 26 May 2024
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full mt-2 w-[60%]">
                      <div
                        className="h-2 bg-primary rounded-full"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                    <div className="flex items-center absolute -top-3 -left-3 rounded-full border-2 border-primary p-0.5">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                    {isExpanded && (
                      <div>
                        <div className="">
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
                        <div class="mt-4 text-right">
                          <a
                            href="#"
                            class="text-sm text-primary font-medium flex items-center justify-end"
                          >
                            view more
                            <svg
                              class="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-10">
                <p className="m-2 text-black">Upcoming</p>
                <div className="relative bg-layoutColor p-4 rounded-3xl rounded-tl-none border-2 md:w-[100%] lg:w-[80%]">
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
              <div className="mb-10">
                <div className="relative bg-layoutColor p-4 rounded-3xl rounded-tl-none border-2 md:w-[100%] lg:w-[80%]">
                  <h3 className="font-bold text-gray-800">Foundations</h3>
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
              <div className="mb-10">
                <div className="relative bg-layoutColor p-4 rounded-3xl rounded-tl-none border-2 md:w-[100%] lg:w-[80%]">
                  <h3 className="font-bold text-gray-800">Soil Testing</h3>
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
              <div className="mb-10">
                <div className="relative bg-layoutColor p-4 rounded-3xl rounded-tl-none border-2 md:w-[100%] lg:w-[80%]">
                  <h3 className="font-bold text-gray-800">Soil Testing</h3>
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
            <div className="w-[250px] h-[54px] border-2 flex justify-between items-center rounded-xl p-1 pl-2 mb-4">
              <div>
                <p className="text-sm">payment</p>
                <p className="text-sm">Due on 05 May 2024</p>
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
              <div>
                <img src={whatsapp} alt="" className="mr-4" />
              </div>
            </div>

            <div className="w-[250px] h-[250px] border-2 justify-between items-center rounded-xl px-2">
              <p class="text-lg font-semibold mb-4">Recent Site Photos</p>
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
              <div class="mt-4 text-right">
                <a
                  href="#"
                  class="text-sm text-primary font-medium flex items-center justify-end"
                >
                  view more
                  <svg
                    class="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
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
