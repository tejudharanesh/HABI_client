import React, { useState } from "react";
import search from "../../assets/images/search.png";
import Back from "../../components/Buttons/Back";

function Faqs({ isExpanded }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question:
        "Approximately how long does it take to complete the construction of one floor?",
      answer:
        "Yes! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      question:
        "What are the major factors on which house construction cost depends?",
      answer: "Answer to this question goes here.",
    },
    {
      question:
        "What is a super built-up area, built-up area, and carpet area?",
      answer: "Answer to this question goes here.",
    },
    {
      question:
        "What is the estimated time it will take to build a full house?",
      answer: "Answer to this question goes here.",
    },
    {
      question: "Do I have to pay the full amount before the project starts?",
      answer: "Answer to this question goes here.",
    },
    {
      question:
        "What to consider when constructing a home by a builder or constructor?",
      answer: "Answer to this question goes here.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-layoutColor font-poppins w-full">
      <div
        className={`flex flex-col items-center w-full bg-layoutColor ${
          isExpanded ? "md:px-20 lg:px-72" : "md:px-16 lg:px-60"
        }`}
      >
        <div className="m-2 w-full relative px-4">
          <Back />
          <p className="text-xl text-black font-medium text-center m-2 mb-4">
            FAQ's
          </p>
          <div className="relative mb-6 w-full">
            <input
              type="text"
              placeholder="Search for topics or questions"
              className="w-full p-2 border border-gray-300 rounded-xl bg-inherit text-sm pl-14"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={search}
              alt="search"
              className="h-5 w-5 absolute left-4 top-1.5"
            />
          </div>
          {filteredFaqs.length ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="mb-2">
                <div
                  className={`cursor-pointer py-1 text-black text-[16px] lg:text-[18px] ${
                    openIndex === index ? "" : "border-b border-gray-300"
                  }`}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {faq.question}
                </div>
                {openIndex === index && (
                  <div className="py-1 border-gray-300">
                    <p className="text-[14px] lg:text-[16px] text-black px-2">
                      {faq.answer}
                    </p>
                    <div className="mt-3 text-gray-400">
                      <p className="text-xs mb-1">Was this helpful?</p>
                    </div>
                    <div className="flex text-black">
                      <button className="w-1/2 py-1 border-y border-gray-300 hover:bg-slate-200">
                        Yes
                      </button>
                      <button className="w-1/2 border border-gray-300 border-r-0 hover:bg-slate-200">
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No matching questions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Faqs;
