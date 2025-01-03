import React, { useState, useRef, useContext } from "react";
import Gallery from "../../assets/svg/Gallery.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CompleteProfile = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const inputFileRef = useRef(null); // Reference for file input

  const phoneNumber = location.state?.phoneNumber || "";

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: phoneNumber,
    email: "",
    pinCode: "",
    address: "",
    profileImage: null, // New state for storing the uploaded image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
    }
  };

  const { mutate: submitUserData, isLoading: isSubmitting } = useMutation({
    mutationFn: async () => {
      return await apiRequest("/auth/completeProfile", "POST", formData);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitUserData();
  };

  return (
    <div className="min-h-screen flex md:items-center justify-center w-screen font-poppins">
      <div className="w-full md:max-w-md lg:max-w-lg p-8 bg-layoutColor md:rounded-2xl">
        <h2 className="text-center text-lg font-semibold mb-6 text-black">
          Complete Your Profile
        </h2>
        <div className="flex justify-center mb-6">
          <div
            className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center border border-primary cursor-pointer"
            onClick={() => inputFileRef.current.click()} // Trigger file input on image click
          >
            <span className="text-gray-400 text-5xl">
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile Preview"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <img src={Gallery} alt="Pic" />
              )}
            </span>
          </div>
          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-5">
            <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-black block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
            />
          </div>
          <div className="relative mb-5">
            <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled
              className="text-black block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
            />
          </div>
          <div className="relative mb-5">
            <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
              Email ID
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-black block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
            />
          </div>
          <div className="relative mb-5">
            <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
              Site Location Pin code
            </label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="text-black block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
            />
          </div>
          <div className="relative mb-5">
            <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
              Current Address
            </label>
            <textarea
              type="text"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="text-black block w-full px-3 py-2 border border-gray-300 rounded-xl bg-layoutColor focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-xl hover:bg-primary mt-20 md:mt-19"
          >
            Complete
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
