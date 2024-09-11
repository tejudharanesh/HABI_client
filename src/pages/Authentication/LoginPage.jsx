import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/habi_logo.png";
import googleLogo from "../../assets/svg/Google.svg";
import facebookLogo from "../../assets/svg/facebook.svg";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //updating the phone number based on user input
  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);
    setIsPhoneValid(value.length === 10 && /^[0-9]+$/.test(value));
  };

  // formatting the phoneNumber
  const formatPhoneNumber = (number) => {
    const phoneNumberObj = parsePhoneNumberFromString(number, "IN");
    return phoneNumberObj ? phoneNumberObj.format("E.164") : null;
  };

  //sending the data to backend through axios
  const handleContinueClick = async (e) => {
    e.preventDefault();
    if (isPhoneValid) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/otp/send",
          {
            phoneNumber: formatPhoneNumber(phone),
          }
        );
        const { token } = response.data;
        localStorage.setItem("token", token); // Store token in local storage
        setUser({ phoneNumber: formatPhoneNumber(phone) });
        navigate("/otp", { state: { phoneNumber: formatPhoneNumber(phone) } });
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      console.log("Invalid phone number");
    }
  };

  return (
    <div className="min-h-screen flex md:items-center justify-center w-screen font-poppins">
      <div className="bg-layoutColor p-8 md:rounded-3xl w-full md:max-w-2xl lg:max-w-3xl md:flex md:flex-row">
        <div className="flex flex-col items-center mb-20 md:mb-0 md:w-1/2">
          <img
            src={logo}
            alt="Habi"
            className="h-40 md:h-40 lg:h-40 xl:h-40 md:mx-auto mt-14  inline"
          />
          {/* Show the text only on large screens and center it below the image */}
          <p className="hidden md:block mt-4 text-center font-DuneRise text-black">
            THE WAY OF LIVING
          </p>
        </div>

        <div className="md:w-2/3 md:pl-16 lg:pl-16">
          <h2 className="text-xl lg:text-2xl font-bold text-start mb-1 text-black">
            Login to Begin Your Journey
          </h2>
          <p className="text-black-500 mb-8 text-sm lg:text-lg">
            Building Your Dream Home Starts Here.
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Enter phone number
            </label>
            <div className="flex">
              <div className="flex items-center px-4 border border-grey-300 border-r-0 bg-white-200 rounded-l-2xl">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                  alt="India Flag"
                  className="w-7 h-4 mr-2"
                />
                <span className="text-black">|+91</span>
              </div>
              <input
                id="phone"
                type="text"
                placeholder="00000 00000"
                className="w-full border bg-layoutColor text-black border-gray-300 border-l-transparent rounded-r-2xl py-2 px-3 focus:outline-none"
                value={phone}
                onChange={handlePhoneChange}
                maxLength="10"
              />
            </div>
          </div>
          <button
            onClick={handleContinueClick}
            className={`w-full py-2 px-4 rounded-2xl transition duration-300 ${
              isPhoneValid
                ? "bg-primary text-white"
                : "bg-primary text-white opacity-50"
            }`}
            disabled={!isPhoneValid}
          >
            Continue
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center mt-7">
            <button className="bg-white border border-gray-300 py-2 px-2 rounded-xl flex items-center space-x-2 hover:bg-gray-50 transition duration-300 mr-5">
              <img src={googleLogo} alt="Google Logo" />
            </button>
            <button className="bg-white border border-gray-300 py-2 px-2 rounded-xl flex items-center space-x-2 hover:bg-gray-50 transition duration-300 ml-5">
              <img src={facebookLogo} alt="Facebook Logo" />
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            By Clicking, I accept the{" "}
            <a href="#" className="text-primary">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
