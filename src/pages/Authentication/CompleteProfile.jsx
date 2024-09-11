import React, { useState } from "react";
import axios from "../../axiosConfig";
import Gallery from "../../assets/svg/Gallery.svg";
import { useLocation, useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const phoneNumber = location.state?.phoneNumber || "";

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: phoneNumber,
    email: "",
    pinCode: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/push", formData);
      if (response) {
        console.log(response.data);
        localStorage.setItem("authToken", response.data.authToken);
        navigate("/");
      }
      // handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      // handle error (e.g., show an error message)
    }
  };

  return (
    <div className="min-h-screen flex md:items-center justify-center w-screen font-poppins">
      <div className="w-full md:max-w-md lg:max-w-lg p-8 bg-layoutColor md:rounded-2xl">
        <h2 className="text-center text-lg font-semibold mb-6 text-black">
          Complete Your Profile
        </h2>
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center border border-primary">
            <span className="text-gray-400 text-5xl">
              <img src={Gallery} alt="Pic" />
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-5">
            <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Teju"
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
              placeholder=""
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
              placeholder="Teju@gmail.com"
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
              placeholder="560103"
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
              placeholder="kodihalli Aralihalli Hosadurga Chittradurga"
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
