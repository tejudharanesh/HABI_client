import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import FAQ from "../../components/Homepage/FAQ";
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
import ImageUpload from "../../components/Homepage/ImageUpload";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { set } from "date-fns";

function Consultation({ isExpanded, user }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showPopup, setShowPopup] = useState(false);
  const [DateTime, setDateTime] = useState(false);
  const [mode, setMode] = useState("online");
  const [type, setType] = useState("home");
  const [currentPage, setCurrentPage] = useState("page1"); // Tracks the current page to render
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: "",
    time: "",
  });
  const [meetingLink, setMeetingLink] = useState("");
  const [showScheduleBooked, setShowScheduleBooked] = useState(false);

  const { data: meetingData, isLoading: isMeetingLoading } = useQuery({
    queryKey: ["meetings"],
    queryFn: async () => {
      console.log("Fetching meetings...");
      return await apiRequest("/meeting/getClientMeeting", "GET");
    },
    retry: false,
  });

  const deleteMeetingMutation = useMutation({
    mutationFn: async (meetingId) => {
      return await apiRequest(`/meeting/deleteMeeting/${meetingId}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["meetings"]); // Refresh meetings after deletion
    },
    onError: (error) => {
      console.error("Error rescheduling meeting:", error);
    },
  });

  const createMeetingMutation = useMutation({
    mutationFn: async (meetingData) => {
      return await apiRequest("/meeting/createMeeting", "POST", meetingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["meetings"]); // Refresh meetings after creation
    },
    onError: (error) => {
      console.error("Error creating meeting:", error);
    },
  });

  useEffect(() => {
    if (!isMeetingLoading && meetingData.meetings) {
      console.log("Received meetings:", meetingData.meetings);
      if (meetingData.meetings.length === 0) {
        console.log("No meetings found.");
        // No meetings, show Page1
        setCurrentPage("page1");
      } else {
        console.log("First meeting:", meetingData.meetings);
        const meeting = meetingData.meetings[0]; // Handle the first meeting
        setSelectedDateTime({ date: meeting?.date, time: meeting?.time });

        if (meeting?.mode === "online") {
          // Online meeting, show Page2
          setMeetingLink(meeting.meetingLink);
          setCurrentPage("page2");
        } else if (meeting?.type === "home") {
          // Home meeting, show Page4
          setCurrentPage("page4");
        } else {
          setCurrentPage("page3");
        }
      }
    }
  }, [meetingData, isMeetingLoading]);

  const handlePhysicallyClick = () => {
    setShowPopup(true);
  };

  const handleDateTime = () => {
    setShowPopup(false);
    setDateTime(true);
  };

  const handleVisitHabi = () => {
    setMode("offline");
    setType("office");
    setShowPopup(false);
    setDateTime(true);
  };

  const handleInviteHabi = () => {
    setMode("offline");
    setType("home");
    setShowPopup(false);
    setDateTime(true);
  };

  const handleBookingConfirmed = (date, time) => {
    const formattedDate = dayjs(date).format("MMMM D, YYYY");
    const formattedTime = dayjs(time).format("hh:mm A");
    const meetingData = {
      date: formattedDate,
      time: formattedTime,
      mode, // "online" or "offline"
      type, // "home" or "office"
    };

    // Trigger the mutation to create a meeting
    createMeetingMutation.mutate(meetingData);

    setDateTime(false);

    // Show ScheduleBooked popup for 3 seconds
    setShowScheduleBooked(true);
    setTimeout(() => {
      setShowScheduleBooked(false);
    }, 3000);
  };

  const handleScheduleClose = () => {
    setDateTime(false);
  };

  const handleReschedule = () => {
    if (meetingData?.meetings?.length > 0) {
      const meetingId = meetingData.meetings[0]._id; // Get the ID of the meeting to delete
      deleteMeetingMutation.mutate(meetingId); // Trigger delete mutation
    }

    setSelectedDateTime({ date: "", time: "" });
    setType("home");
    setMode("online");
    setCurrentPage("page1");
  };

  const faqOpen = () => {
    navigate("/dashboard/faq");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-poppins w-full h-auto">
      <div
        className={`flex flex-col items-center w-full bg-layoutColor shadow p-4 h-auto mb-2 md:mb-3 ${
          isExpanded
            ? "md:px-14 lg:px-40 xl:px-[20%]"
            : "md:px-3 lg:px-28 xl:px-[20%]"
        }`}
      >
        <h1 className="text-[20px] lg:text-[24px] text-black font-medium">
          Book Free Consultation
        </h1>
        {currentPage === "page1" ? (
          <Page1
            handleDateTime={handleDateTime}
            handlePhysicallyClick={handlePhysicallyClick}
          />
        ) : currentPage === "page2" ? (
          <Page2
            selectedDateTime={selectedDateTime}
            meetingLink={meetingLink}
            onReschedule={handleReschedule}
          />
        ) : currentPage === "page3" ? (
          <Page3
            selectedDateTime={selectedDateTime}
            onReschedule={handleReschedule}
          />
        ) : (
          <Page4
            selectedDateTime={selectedDateTime}
            onReschedule={handleReschedule}
          />
        )}
      </div>
      <ImageUpload />
      <OnePercent isExpanded={isExpanded} />
      <Design isExpanded={isExpanded} />

      <HabiFeatures isExpanded={isExpanded} />
      <Youtube isExpanded={isExpanded} />

      <div
        className={`flex flex-col items-center w-full bg-layoutColor shadow p-4 h-auto  ${
          isExpanded
            ? "md:px-14 lg:px-40 xl:px-[20%]"
            : "md:px-30 lg:px-28 xl:px-[20%]"
        }`}
      >
        <div className="rounded-xl w-full">
          <FAQ faqOpen={faqOpen} />
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
      {showScheduleBooked && <ScheduleBooked />}
    </div>
  );
}

export default Consultation;
