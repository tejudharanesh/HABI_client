import { useState, useRef, useEffect } from "react";
import TopLayer from "../../components/Client_homepage/TopLayer";
import ProjectCards from "../../components/Client_homepage/ProjectCards";
import Notifications from "../../components/Client_homepage/Notifications";
import GetDate from "../../components/Client_homepage/GetDate";
import TabMiddleLayer from "../../components/Client_homepage/TabMiddleLayer";
import axios from "axios";
import MobileMiddleLayer from "../../components/Client_homepage/MobileMiddleLayer";

const HomePage = ({ authUser, pushId }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [page1Height, setPage1Height] = useState(350);
  const page2Ref = useRef(null);
  const lastScrollTop = useRef(0);

  const showPopup = () => {
    setPopupVisible(true);
    axios.post("http://localhost:5000/api/projects/createProject", {
      message: "asdf jkl asdf jkl",
      title: "wekfwefweoifjoi",
      id: pushId,
      userId: authUser._id,
    });
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  // Function to handle scroll
  const handleScroll = () => {
    const page2Element = page2Ref.current;

    if (page2Element) {
      const scrollTop = page2Element.scrollTop;

      // If scrolling down
      if (scrollTop > lastScrollTop.current) {
        setPage1Height(170); // Reduce height
      } else {
        // If scrolling up
        setPage1Height(350); // Restore height
      }

      // Update last scroll position
      lastScrollTop.current = scrollTop;
    }
  };

  useEffect(() => {
    const page2Element = page2Ref.current;

    if (page2Element) {
      page2Element.addEventListener("scroll", handleScroll);
    }

    // Cleanup event listener on unmount
    return () => {
      if (page2Element) {
        page2Element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-layoutColor font-poppins w-full h-auto">
      <div
        className="flex flex-col items-center w-full bg-layoutColor h-auto sticky top-0 z-10 transition-all duration-500"
        style={{ height: `${page1Height}px` }}
      >
        <TopLayer showPopup={showPopup} user={authUser} />
      </div>
      <GetDate />
      <MobileMiddleLayer />
      <div
        className="flex flex-col md:flex-row w-full bg-layoutColor xl:px-[10%] h-screen overflow-y-auto no-scrollbar"
        ref={page2Ref}
      >
        {/* Scrollable ProjectCards */}
        <div
          className="flex-1 md:w-[60%] no-scrollbar"
          style={{ height: "100%" }}
        >
          <ProjectCards />
        </div>

        {/* Fixed TabMiddleLayer */}
        <div
          className="hidden md:flex md:w-[40%]"
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          <TabMiddleLayer />
        </div>
      </div>

      {isPopupVisible && <Notifications onClose={hidePopup} />}
    </div>
  );
};

export default HomePage;
