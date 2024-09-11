import React, { useState } from "react";
import leftarrow from "../assets/svg/leftArrow.svg";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "Does habi charge an advance payment?",
      answer:
        "Yes, habi collects a booking amount of about 1% of the total home construction cost. Alongside this, we conduct digital surveys, perform soil tests, and create a floor plan.",
    },
    {
      question: "Does habi charge an advance payment?",
      answer:
        "Yes, habi collects a booking amount of about 1% of the total home construction cost. Alongside this, we conduct digital surveys, perform soil tests, and create a floor plan.",
    },
    {
      question: "Does habi charge an advance payment?",
      answer:
        "Yes, habi collects a booking amount of about 1% of the total home construction cost. Alongside this, we conduct digital surveys, perform soil tests, and create a floor plan.",
    },
    {
      question: "Does habi charge an advance payment?",
      answer:
        "Yes, habi collects a booking amount of about 1% of the total home construction cost. Alongside this, we conduct digital surveys, perform soil tests, and create a floor plan.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full font-poppins">
      <h2 className="text-[16px] lg:text-[18px] text-black font-semibold text-center mb-6">
        FAQ's
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className={`w-full flex justify-between items-center text-left text-[18px] p-2 border rounded-lg bg-primaryO ${
              activeIndex === index
                ? "text-primary border-b-0 rounded-b-none"
                : "text-black"
            } transition-colors duration-1000`}
            onClick={() => toggleFAQ(index)}
          >
            <span className="flex-grow text-[14px] lg:text-[16px]">
              {index + 1}. {faq.question}
            </span>
            <span>
              <img
                src={leftarrow}
                alt="-"
                className={`${activeIndex === index ? "z-0" : "rotate-180"}`}
              />
            </span>
          </button>
          {activeIndex === index && (
            <div className="p-4 text-black border border-t-0 rounded-lg rounded-t-none text-[12px] lg:text-[14px]">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
      <div className="text-end mt-4">
        <a href="#" className="text-primary underline text-sm">
          Still have a questions ?
        </a>
      </div>
    </div>
  );
};

export default FAQ;
