import { useState, useEffect } from "react";
import Page1 from "../../components/Client_homepage/Page1";
import Page2 from "../../components/Client_homepage/Page2";
import Notifications from "../../components/Client_homepage/Notifications";

const HomePage = ({ isExpanded }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [page1Height, setPage1Height] = useState(350); // Default height for Page1
  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  // Function to handle scroll and dynamically adjust Page1's height
  const handleScroll = () => {
    console.log("Scrolling..."); // Debugging log to check if the scroll event is firing
    const scrollPosition = window.scrollY; // Get the scroll position
    console.log("Scroll position:", scrollPosition); // Check the scroll position

    const maxHeight = 350; // Starting height of Page1
    const minHeight = 262; // Minimum height to prevent shrinking too much

    // Reduce the height as the user scrolls down, capped at minHeight
    const newHeight = Math.max(maxHeight - scrollPosition * 0.25, minHeight);
    console.log("New Height:", newHeight); // Log the calculated height
    setPage1Height(newHeight); // Update the height dynamically
  };

  useEffect(() => {
    console.log("Attaching scroll listener...");
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener on unmount
      console.log("Removing scroll listener...");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-background font-poppins w-full h-auto">
      <div className="flex flex-col items-center w-full bg-layoutColor h-auto sticky top-0 z-10">
        <Page1 showPopup={showPopup} imageHeight={page1Height} />{" "}
        {/* Pass dynamic height to Page1 */}
      </div>
      <div className="flex flex-col w-full bg-layoutColor h-auto xl:px-60">
        <Page2 />
      </div>
      {isPopupVisible && <Notifications onClose={hidePopup} />}
    </div>
  );
};

export default HomePage;
