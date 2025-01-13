import { useState, useRef, useEffect } from "react";
import Page1 from "../../components/Client_homepage/Page1";
import Page2 from "../../components/Client_homepage/Page2";
import Notifications from "../../components/Client_homepage/Notifications";
import axios from "axios";

const HomePage = ({ authUser, pushId }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [page1Height, setPage1Height] = useState(350);
  const page2Ref = useRef(null);
  const lastScrollTop = useRef(0);

  const showPopup = () => {
    setPopupVisible(true);
    axios.post("http://localhost:5000/api/notifications/send", {
      message: "ikjwefojfgj",
      title: "wekfwefweoifjoi",
      id: pushId, // Use pushId derived from subscription
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
    <div className="min-h-screen flex flex-col items-center bg-background font-poppins w-full h-auto">
      <div
        className="flex flex-col items-center w-full bg-layoutColor h-auto sticky top-0 z-10 transition-all duration-500"
        style={{ height: `${page1Height}px` }}
      >
        <Page1 showPopup={showPopup} user={authUser} />
        {/* Pass dynamic height to Page1 */}
      </div>
      <div
        ref={page2Ref}
        className="flex flex-col w-full bg-layoutColor xl:px-[10%] overflow-y-auto  h-screen"
      >
        <Page2 />
      </div>

      {isPopupVisible && <Notifications onClose={hidePopup} />}
    </div>
  );
};

export default HomePage;
