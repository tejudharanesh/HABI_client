import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import whatsapp from "../../assets/images/Whatsapp.png";
import site from "../../assets/images/site.png";
import PaymentBar from "./PaymentBar";
import { apiRequest } from "../../services/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

function Page2() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: projectData, isLoading: isProjectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("Fetching projects...");
      return await apiRequest("/projects/project", "GET");
    },
    retry: false,
  });

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <div className="md:px-[8%] lg:px-[] xl:px-[] bg-layoutColor h-auto">
        <div className="text-gray-500 m-5 md:hidden ">25 May 2024</div>

        <div className="flex flex-col md:flex-row">
          {/* Payment and Chat for small screens */}
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
                  {isProjectLoading && <p>Loading...</p>}
                  {projectData && projectData.length === 0 && (
                    <p>No ongoing projects</p>
                  )}
                  {projectData &&
                    projectData.length > 0 &&
                    projectData[0].stages?.map((stage, index) => (
                      <div
                        key={index}
                        onClick={() => toggleExpand(index)}
                        className="relative bg-layoutColor p-4 rounded-3xl rounded-tl-none border-2 md:w-[100%] lg:w-[90%] mb-2"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-gray-800">
                            {stage.name}
                          </h3>
                          <p>
                            {stage?.substages?.some(
                              (substage) => substage.status === "ongoing"
                            )
                              ? "Ongoing"
                              : "Pending"}
                          </p>{" "}
                        </div>
                        {stage?.substages?.map((substage) => (
                          <p className="text-sm text-black">{substage.name}</p>
                        ))}
                        <p className="text-sm text-gray-500 inline mr-2">
                          25 May 2024 - 26 May 2024
                        </p>
                        <p className="text-red-400 inline text-sm">
                          2 days delay
                        </p>
                        <div className="bg-red-400 w-1 h-1 rounded inline-block mb-0.5 ml-0.5"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-3 bg-gray-200 rounded-full mt-2 w-[80%] inline-block">
                            <div
                              className="h-3 bg-primary rounded-full"
                              style={{
                                width: `${
                                  (stage?.substages?.filter(
                                    (substage) => substage.status === "ongoing"
                                  ).length / stage?.substages?.length || 0) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="inline text-black text-sm mt-2">
                            {Math.round(
                              (stage?.substages?.filter(
                                (substage) => substage.status === "ongoing"
                              ).length / stage?.substages?.length || 0) * 100
                            )}
                            %
                          </p>
                        </div>

                        <div className="flex items-center absolute -top-3 -left-3 rounded-full border border-primary p-0.5">
                          <div className="w-4 h-4 bg-primary rounded-full"></div>
                        </div>
                        {expandedIndex === index && (
                          <div>
                            <div>
                              <img
                                src={site}
                                alt="Site Photo 1"
                                className="w-[90px] h-[69px] object-cover rounded-lg inline-block"
                              />
                            </div>
                            <div className="mt-4">
                              <button className="px-4 py-2 border-red-400 border rounded-lg text-red-400 bg-red-50 w-[155px]">
                                Query
                              </button>
                              <button className="px-4 py-2 text-white bg-primary rounded-lg ml-3 w-[155px]">
                                Approve
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment and Chat for medium and larger screens */}
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
