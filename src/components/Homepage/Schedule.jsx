import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import cancel from "../../assets/svg/cancel.svg";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../services/api";

const Schedule = ({ show, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  // Generate available times dynamically based on selected date
  const generateAvailableTimes = (selectedDate) => {
    if (!selectedDate) return [];

    const startOfDay = dayjs(selectedDate).hour(10).minute(0); // Start from 10:00 AM
    const availableTimes = [];
    
    // Generate times every 30 minutes from 10:00 AM to 6:00 PM (assuming work hours)
    for (let i = 0; i < 19; i++) {
      availableTimes.push(startOfDay.add(i * 30, "minute"));
    }

    return availableTimes;
  };

  const availableTimes = generateAvailableTimes(selectedDate);

  // Fetch booked meetings
  const { data: meetingData, isLoading } = useQuery({
    queryKey: ["bookedMeetings"],
    queryFn: async () => {
      const response = await apiRequest("/meeting/getAllMeetings", "GET");
      return response.meetings.map((meeting) => ({
        date: dayjs(meeting.date, "MMMM D, YYYY"),
        time: dayjs(meeting.time, "hh:mm A"),
      }));
    },
    retry: false,
  });

  const isSlotAvailable = (time) => {
    if (!meetingData || !selectedDate) return true;

    // Filter out the meetings that match the selected date
    const filteredMeetings = meetingData.filter((meeting) =>
      meeting.date.isSame(dayjs(selectedDate), "day")
    );

    // Check if the time slot is within the buffer time of any meeting
    return filteredMeetings.every((meeting) => {
      const meetingTime = meeting.date.hour(meeting.time.hour()).minute(meeting.time.minute());
      const startBuffer = meetingTime.subtract(1, "hour");
      const endBuffer = meetingTime.add(1, "hour");

      return time.isBefore(startBuffer) || time.isAfter(endBuffer);
    });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const isConfirmEnabled = selectedDate && selectedTime;

  const handleConfirmClick = () => {
    if (isConfirmEnabled) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  if (!show) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
        <div className="w-96 p-4 bg-layoutColor rounded-lg shadow-lg md:ml-40 lg:ml-[18%] mx-auto absolute">
          <h2 className="text-xl font-semibold text-center mb-4 text-black">
            Set your Schedule
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-black">Select a date</h3>
            <div className="flex justify-center mb-4">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                minDate={today}
                maxDate={maxDate}
                className="bg-layoutColor custom-datepicker"
                calendarClassName="!bg-white"
              />
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-black">Choose your meeting time</h3>
            <div className="flex justify-center mb-4 text-black">
              <select
                className="bg-white border border-gray-300 p-2 rounded w-full"
                value={selectedTime ? selectedTime.format("HH:mm") : ""}
                onChange={(e) =>
                  handleTimeChange(dayjs(e.target.value, "HH:mm"))
                }
                disabled={isLoading}
              >
                <option value="" disabled>
                  {isLoading ? "Loading slots..." : "Select your preferred time"}
                </option>
                {availableTimes.map((time) => {
                  const isAvailable = isSlotAvailable(time);
                  return (
                    <option
                      key={time.format("HH:mm")}
                      value={time.format("HH:mm")}
                      disabled={!isAvailable}
                      className={!isAvailable ? "blur-sm opacity-50" : ""}
                      title={!isAvailable ? "Slot unavailable" : ""}
                    >
                      {time.format("hh:mm A")}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-black">
              <FaCalendarAlt />
              <span className="ml-2">
                {selectedDate ? selectedDate.toDateString() : "Select a date"}
              </span>
            </div>
            <div className="flex items-center text-black">
              <FaClock />
              <span className="ml-2">
                {selectedTime ? selectedTime.format("hh:mm A") : "Select a time"}
              </span>
            </div>
          </div>

          <button
            className={`w-full p-2 rounded-xl ${
              isConfirmEnabled
                ? "bg-primary text-white"
                : "bg-primaryO text-gray-400"
            }`}
            disabled={!isConfirmEnabled}
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
          <button
            className="absolute top-4 right-4 text-gray-500"
            onClick={onClose}
          >
            <img src={cancel} alt="Close" />
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Schedule;
