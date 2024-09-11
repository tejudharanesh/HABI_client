import React from "react";
import PaymentBlock from "../../components/Client_homepage/PaymentBlock";
import PaymentSummary from "../../components/Client_homepage/PaymentSummary";
import back from "../../assets/images/back.png";
import { useNavigate } from "react-router-dom";

const paymentStages = [
  {
    stage: "Stage 01",
    title: "Acceptance of Proposal",
    cost: "01% of the Total cost",
    stages: [],
    week: "1st Week",
    date: "25 May 2024",
  },
  {
    stage: "Stage 02",
    title: "Mobilization Advance",
    cost: "20% of the Total cost",
    stages: ["Site Marking", "Excavation", "Foundation", "Upto Plinth Level"],
    week: "2nd Week",
    date: "",
    dueDate: "22 June",
  },
  {
    stage: "Stage 03",
    title: "Completion of Slab",
    cost: "30% of the Total cost",
    stages: [
      "Ground Floor",
      "First Floor",
      
    ],
    week: "9th - 23rd Week",
    date: "",
    dueDate: "22 June",
  },
  {
    stage: "Stage 04",
    title: "Completion of Internal Work",
    cost: "30% of the Total cost",
    stages: [
      "Ground Floor",
      "First Floor",
      "Second Floor",
      "Third Floor",
      "Forth Floor",
    ],
    week: "9th - 23rd Week",
    date: "",
    dueDate: "22 June",
  },
  // Add more stages as needed
];

const currentStage = 3;

const PaymentsPage = () => {
  const navigate = useNavigate();
  const paidSegments = 1;
  const totalSegments = 7;
  const segmentAngle = 360 / totalSegments;
  const paidAngle = paidSegments * segmentAngle;
  return (
    <div className="relative flex flex-col md:flex-row items-start p-2 bg-layoutColor min-h-screen font-poppins px-4 md:pl-10 lg:pl-28 xl:pl-60">
      <div className="relative w-full md:w-[60%] lg:w-[50%]">
        <button
          className="absolute top-2 md:hidden"
          onClick={() => navigate(-1)}
        >
          <img src={back} alt="" />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Payments
        </h2>
        {paymentStages.map((stages, index) => (
          <PaymentBlock
            key={index}
            data={stages}
            currentStage={currentStage}
            stageNumber={index + 1}
          />
        ))}
      </div>
      <PaymentSummary paidAngle={paidAngle} />
    </div>
  );
};

export default PaymentsPage;
