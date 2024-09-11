import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import FAQ from "../../components/FAQ";
import Meeting from "../../components/Homepage/Meeting";
import Schedule from "../../components/Homepage/Schedule";
import Page1 from "../../components/Homepage/Page1";
import Page2 from "../../components/Homepage/Page2";
import Page3 from "../../components/Homepage/Page3";
import Page4 from "../../components/Homepage/page4";
import HabiFeatures from "../../components/Homepage/HabiFeatures";
import ScheduleBooked from "../../components/Homepage/ScheduleBooked";
import dayjs from "dayjs";
import OnePercent from "../../components/Homepage/OnePercent";
import Design from "../../components/Homepage/Design";
import Youtube from "../../components/Homepage/Youtube";

function Consultation({ isExpanded }) {
  const [showPopup, setShowPopup] = useState(false);
  const [DateTime, setDateTime] = useState(false);
  const [isPage1, setIsPage1] = useState(true);
  const [isPage3, setIsPage3] = useState(false);
  const [isPage4, setIsPage4] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: "",
    time: "",
  });
  const [showScheduleBooked, setShowScheduleBooked] = useState(false);

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    const storedTime = localStorage.getItem("selectedTime");
    const storedOption = localStorage.getItem("selectedOption");

    if (storedDate && storedTime) {
      setSelectedDateTime({
        date: storedDate,
        time: storedTime,
      });
      setIsPage1(false);
      if (storedOption === "visitHabi") {
        setIsPage3(true);
      } else if (storedOption === "inviteHabi") {
        setIsPage4(true);
      } else {
        setIsPage1(false);
      }
    }
  }, []);

  const handlePhysicallyClick = () => {
    setShowPopup(true);
  };

  const handleDateTime = () => {
    setShowPopup(false);
    setDateTime(true);
  };

  const handleVisitHabi = () => {
    setShowPopup(false);
    setDateTime(true);
    setIsPage3(true);
    localStorage.setItem("selectedOption", "visitHabi");
  };

  const handleInviteHabi = () => {
    setShowPopup(false);
    setDateTime(true);
    setIsPage4(true);
    localStorage.setItem("selectedOption", "inviteHabi");
  };

  const handleBookingConfirmed = (date, time) => {
    const formattedDate = dayjs(date).format("MMMM D, YYYY");
    const formattedTime = dayjs(time).format("hh:mm A");
    setDateTime(false);
    setIsPage1(false);

    setSelectedDateTime({ date: formattedDate, time: formattedTime });
    localStorage.setItem("selectedDate", formattedDate);
    localStorage.setItem("selectedTime", formattedTime);

    // Show ScheduleBooked popup for 3 seconds
    setShowScheduleBooked(true);
    setTimeout(() => {
      setShowScheduleBooked(false);

      // Render the appropriate page after the popup closes
      const storedOption = localStorage.getItem("selectedOption");
      if (storedOption === "visitHabi") {
        setIsPage3(true);
      } else if (storedOption === "inviteHabi") {
        setIsPage4(true);
      }
    }, 3000);
  };

  const handleScheduleClose = () => {
    setDateTime(false);
    setIsPage1(true);
    setIsPage3(false);
    setIsPage4(false);
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("selectedOption");
  };

  const handleReschedule = () => {
    setIsPage1(true);
    setIsPage3(false);
    setIsPage4(false);
    setSelectedDateTime({ date: "", time: "" });
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("selectedOption");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background font-poppins w-full">
      <div
        className={`flex flex-col items-center w-full bg-layoutColor shadow p-4 h-auto mb-3 ${
          isExpanded ? "md:px-14 lg:px-40" : "md:px-3 lg:px-28"
        }`}
      >
        <h1 className="text-[21px] lg:text-[24px] my-4 text-black font-medium">
          Book Free Consultation
        </h1>
        {isPage1 ? (
          <Page1
            handleDateTime={handleDateTime}
            handlePhysicallyClick={handlePhysicallyClick}
          />
        ) : isPage3 ? (
          <Page3
            selectedDateTime={selectedDateTime}
            onReschedule={handleReschedule}
          />
        ) : isPage4 ? (
          <Page4
            selectedDateTime={selectedDateTime}
            onReschedule={handleReschedule}
          />
        ) : (
          <Page2
            selectedDateTime={selectedDateTime}
            onReschedule={handleReschedule}
          />
        )}
      </div>
      <OnePercent isExpanded={isExpanded} />
      <Design isExpanded={isExpanded} />
      <HabiFeatures isExpanded={isExpanded} />
      <Youtube isExpanded={isExpanded} />

      <div
        className={`flex flex-col items-center w-full bg-layoutColor shadow p-4 h-auto mb-3 ${
          isExpanded ? "md:px-14 lg:px-72" : "md:px-3 lg:px-60"
        }`}
      >
        {" "}
        <div className="rounded-xl w-full">
          <FAQ />
        </div>
      </div>
      <div
        className={`flex flex-col items-center w-full bg-layoutColor shadow p-4 h-auto mb-3 ${
          isExpanded ? "md:px-14 lg:px-72" : "md:px-3 lg:px-60"
        }`}
      >
        {" "}
        <div className="rounded-xl py-5 w-full">
          <Footer />
        </div>
      </div>
      <Meeting
        show={showPopup}
        onClose={() => setShowPopup(false)}
        handleVisitHabi={handleVisitHabi}
        handleInviteHabi={handleInviteHabi}
      />
      <Schedule
        show={DateTime}
        onClose={handleScheduleClose}
        onConfirm={handleBookingConfirmed}
      />
      {showScheduleBooked && <ScheduleBooked/>}
    </div>
  );
}

export default Consultation;
