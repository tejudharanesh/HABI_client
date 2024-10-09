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

  // Function to handle scroll and log a message
  const handleScroll = () => {
    console.log("Hi from scroll event!"); // Log message when scroll happens
  };

  useEffect(() => {
    // Attach the scroll event listener to the document or window
    const scrollTarget = document; // You can also try document here for some cases

    console.log("Attaching scroll listener...");
    scrollTarget.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      console.log("Removing scroll listener...");
      scrollTarget.removeEventListener("scroll", handleScroll);
    };
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="min-h-screen flex flex-col items-center bg-background font-poppins w-full h-auto">
      <div className="flex flex-col items-center w-full bg-layoutColor h-auto sticky top-0 z-10">
        <Page1 showPopup={showPopup} imageHeight={page1Height} />
        {/* Pass dynamic height to Page1 */}
      </div>
      <div className="flex flex-col w-full bg-layoutColor flex-grow xl:px-[10%]">
        <Page2 />
      </div>

      {isPopupVisible && <Notifications onClose={hidePopup} />}
    </div>
  );
};

export default HomePage;
