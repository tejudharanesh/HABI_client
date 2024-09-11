import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../../components/Buttons/Back";
import AddFamilyMembers from "../../components/Client_profile/AddFamilyMembers";
import Footer from "../../components/Footer/Footer";

import cover from "../../assets/images/cover.png";
import profile from "../../assets/images/profile.png";
import edit from "../../assets/svg/edit.svg";
import arrow from "../../assets/svg/arrow.svg";
import faq from "../../assets/svg/FAQ.svg";
import policy from "../../assets/svg/policy.svg";
import terms from "../../assets/svg/terms.svg";
import habi from "../../assets/svg/habi.svg";
import logout from "../../assets/svg/Logout.svg";
import friend from "../../assets/images/friend.png";
import family from "../../assets/images/family.png";

const Profile = ({ isExpanded, user }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const containerClass = `flex flex-col items-center w-full bg-layoutColor h-auto mb-3 ${
    isExpanded ? "md:px-20 lg:px-72" : "md:px-16 lg:px-60"
  }`;

  const toggleEditMode = () => {
    setEditable((prev) => !prev); // Toggle editable state
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background font-poppins w-full">
      <div className={containerClass}>
        <div className="rounded-xl w-full relative">
          <div className="relative w-full h-40">
            {user === "client" && <Back />}
            <p className="text-center text-black text-[21px] md:text-[24px] my-2 pt-1">
              Profile
            </p>
            <img
              src={cover}
              alt="Background"
              className="w-full h-[110px] object-cover md:rounded-lg"
            />
            <div className="absolute -bottom-12 left-4 md:left-0 flex items-center">
              <img
                src={profile}
                alt="Profile"
                className="w-[94px] h-[94px] rounded-full"
              />
            </div>
            <button
              className={`absolute right-3 md:right-0 -bottom-11 rounded-lg w-[78px] h-[31px] ${
                editable
                  ? "bg-primary text-layoutColor"
                  : "border-primary bg-primaryO text-primary border-2"
              }`}
              onClick={toggleEditMode}
            >
              <img
                src={edit}
                alt=""
                className={`inline mr-1 ${editable ? "hidden" : ""}`}
              />
              {editable ? "Done" : "Edit"}
            </button>
          </div>
          <form className="mt-[77px] space-y-7 w-full px-4 md:px-0 mb-3">
            {[
              { label: "Name", placeholder: "Teju" },
              { label: "Phone Number", placeholder: "+91 8431497190" },
              { label: "Email ID", placeholder: "teju@gmail.com" },
              { label: "Site Location Pin code", placeholder: "506103" },
              {
                label: "Current Address",
                placeholder:
                  "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
                type: "textarea",
              },
            ].map(({ label, placeholder, type = "text" }, i) => (
              <div key={i} className="relative mb-5">
                <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
                  {label}
                </label>
                {type === "text" ? (
                  <input
                    type={type}
                    placeholder={placeholder}
                    className="text-black block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
                    disabled={!editable} // Disable input if not editable
                  />
                ) : (
                  <textarea
                    rows={3}
                    placeholder={placeholder}
                    className="text-black block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
                    disabled={!editable} // Disable input if not editable
                  />
                )}
              </div>
            ))}
          </form>
        </div>
      </div>
      {user === "client" && (
        <div className={containerClass}>
          <div
            className="rounded-xl w-full p-3 m-2 py-1 flex justify-between items-center"
            onClick={() => setPopupVisible(true)}
          >
            <span className="flex items-center">
              <img src={family} alt="" />
              <span className="ml-4 text-black text-[16px]">
                Add Family Members
              </span>
            </span>
            <img src={arrow} className="mr-2 md:mr-0 h-4 w-4" />
          </div>
        </div>
      )}
      <div className={containerClass}>
        <ul className="rounded-xl w-full p-3 py-1">
          {user === "client" && (
            <li className="flex justify-between items-center py-2 w-full">
              <span className="flex items-center">
                <img src={friend} alt="Friend" className="w-6 h-6" />
                <span className="ml-4 text-black text-[16px]">
                  Refer a friend
                </span>
              </span>
              <img src={arrow} alt="Arrow" className="mr-2 md:mr-0 w-4 h-4" />
            </li>
          )}
          {[
            {
              label: "FAQ's",
              icon: faq,
              onClick: () => navigate("/dashboard/faq"),
            }, //for client its faq
            { label: "Privacy Policies", icon: policy },
            { label: "Terms & conditions", icon: terms },
            { label: "habi's story", icon: habi },
          ].map(({ label, icon, onClick = () => {} }, i) => (
            <li
              key={i}
              className="flex justify-between items-center py-2 w-full"
              onClick={onClick}
            >
              <span className="flex items-center">
                <img src={icon} alt={label} className="w-6 h-6" />
                <span className="ml-4 text-black text-[16px]">{label}</span>
              </span>
              <img src={arrow} alt="Arrow" className="mr-2 md:mr-0 w-4 h-4" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center w-full p-2 mb-14 h-auto lg:px-32">
        <button className="bg-layoutColor text-secondary rounded-lg w-[360px] h-[44px] border-2">
          <img src={logout} alt="" className="inline mr-2" />
          Logout
        </button>
        {user === "new" && <Footer />}
      </div>
      {isPopupVisible && (
        <AddFamilyMembers onClose={() => setPopupVisible(false)} />
      )}
    </div>
  );
};

export default Profile;
