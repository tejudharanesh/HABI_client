import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const Profile = ({ isExpanded, user, authUser }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [editable, setEditable] = useState(false);

  const [formData, setFormData] = useState({
    name: authUser.name,
    phoneNumber: authUser.phoneNumber,
    email: authUser.email,
    sitePinCode: authUser.sitePinCode,
    currentLocation: authUser.currentLocation,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const containerClass = `flex flex-col items-center w-full bg-layoutColor h-auto mb-3 ${
    isExpanded
      ? "md:px-20 lg:px-72 xl:px-[30%]"
      : "md:px-16 lg:px-60 xl:px-[30%]"
  }`;

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: async () => {
      return await apiRequest("/auth/completeProfile", "POST", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
    mutationFn: async () => {
      return await apiRequest("/auth/logout", "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.setQueryData(["authUser"], null); // Clear authUser data
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const toggleEditMode = () => {
    if (editable) {
      updateProfile(); // Call updateProfile when switching to "Done"
    }
    setEditable((prev) => !prev); // Toggle the editable state
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const formFieldConfig = {
    name: { label: "Name", type: "text" },
    phoneNumber: { label: "Phone Number", type: "text" },
    email: { label: "Email ID", type: "email" },
    sitePinCode: { label: "Site Location Pin code", type: "text" },
    currentLocation: { label: "Current Address", type: "textarea" },
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
            {Object.keys(formData).map((key) => {
              const { label, type } = formFieldConfig[key];
              return (
                <div key={key} className="relative mb-5">
                  <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
                    {label}
                  </label>
                  {key === "phoneNumber" ? (
                    <input
                      type={type}
                      value={formData[key]}
                      className="text-gray-500 block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
                      disabled={true} // Disable phone number field
                    />
                  ) : type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={formData[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className={`block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none ${
                        editable ? "text-black" : "text-gray-500"
                      }`}
                      disabled={!editable} // Make it editable based on the `editable` state
                    />
                  ) : (
                    <input
                      type={type}
                      value={formData[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className={`block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none ${
                        editable ? "text-black" : "text-gray-500"
                      }`}
                      disabled={!editable} // Make other fields editable based on the `editable` state
                    />
                  )}
                </div>
              );
            })}
          </form>
        </div>
      </div>
      {user === "client" && (
        <div className={containerClass}>
          <div
            className="rounded-xl w-full p-3 m-2 py-1 flex justify-between items-center cursor-pointer"
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
            <li className="flex justify-between items-center py-2 w-full cursor-pointer">
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
              className="flex justify-between items-center py-2 w-full cursor-pointer"
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
      <div className="flex flex-col items-center w-full p-2 h-auto mb-2 lg:px-32">
        <button
          className="bg-layoutColor rounded-lg w-[360px] h-[44px] border-2"
          onClick={(e) => {
            e.preventDefault();
            logOut();
          }}
        >
          <img src={logout} alt="" className="inline mr-2" />
          {isLoggingOut ? "Logging out..." : " Logout"}
        </button>
        {user === "lead" && <Footer />}
      </div>
      <br />
      <br />

      {isPopupVisible && (
        <AddFamilyMembers onClose={() => setPopupVisible(false)} />
      )}
    </div>
  );
};

export default Profile;
