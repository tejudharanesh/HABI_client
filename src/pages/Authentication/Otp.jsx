import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Back from "../../components/Buttons/Back";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const firstInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const phoneNumber = location.state?.phoneNumber || "";
  const formatNumber = location.state?.formatNumber || "";

  useEffect(() => {
    // Set focus on the first OTP input field when the component mounts
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Check if OTP is valid (all fields are filled)
    setIsOtpValid(otp.every((digit) => digit !== ""));
  }, [otp]);

  const {
    mutate: sendOtp,
    isError,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (data) => {
      return await apiRequest("/auth/validateOtp", "POST", data);
    },

    onSuccess: (data) => {
      toast.success("Otp sent successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: resend, isLoading: isResendLoading } = useMutation({
    mutationFn: async (data) => {
      return await apiRequest("/auth/sendOtp", "POST", data);
    },
    onSuccess: () => {
      toast.success("Otp validation successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field automatically
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const validateOtp = async () => {
    const otpString = otp.join("");
    sendOtp({ phoneNumber, otp: otpString });

    //     const response = await validateOtp1(phoneNumber, otpString);
    //     if (response.success) {
    //       // Check if the user's profile is complete
    //       const profileResponse = await getUserProfile(phoneNumber);
    //       if (profileResponse.success) {
    //         // Navigate to the home page if the profile is complete
    //         login1(profileResponse.profile);
    //         navigate("/");
    //       } else {
    //         // Navigate to complete profile page if not complete
    //         navigate("/completeProfile", { state: { phoneNumber: phoneNumber } });
    //       }
    //     } else {
    //       toast.error("Wrong OTP");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     toast.error("Error validating OTP:", error);
    //   }
  };

  const resendOtp = async () => {
    //   // Send OTP again
    resend({ phoneNumber: formatNumber });
    //   try {
    //     const response = await sendOtp(formatNumber);
    //     if (response.success) {
    //       toast.success("OTP resent successfully.");
    //       setTimer(60); // Restart the timer after resending
    //     } else {
    //       toast.error("Failed to resend OTP. Please try again.");
    //     }
    //   } catch (error) {
    //     toast.error("Error resending OTP:", error);
    //   }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen flex md:items-center justify-center w-screen font-poppins">
      <div className="w-full md:max-w-md lg:max-w-lg p-8 bg-layoutColor md:rounded-2xl">
        <h2 className="mb-4 text-xl md:text-lg lg:text-xl font-semibold text-center text-black">
          Verify your details
        </h2>
        <Back />
        <p className="mb-4 text-center text-sm md:text-xl lg:text-xl">
          Enter OTP sent to +91
          <span className="text-black">{phoneNumber}</span>
          via SMS
        </p>
        <div className="flex mb-2 mt-5 justify-center">
          <p className="text-grey font-semibold text-black ">Enter OTP</p>
        </div>
        <div className="flex justify-center mb-4 space-x-6">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              ref={index === 0 ? firstInputRef : null}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-16 h-12 text-2xl text-center bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            />
          ))}
        </div>
        <div className="flex justify-between mb-14">
          <span className="text-sm block">
            Didn't receive OTP?
            <button
              onClick={resendOtp}
              className={`inline
                ${timer === 0 ? "text-primary text-lg" : "cursor-not-allowed"}
              `}
              disabled={timer > 0}
            >
              Resend
            </button>
          </span>
          <span className="text-gray-500">
            00:
            {timer < 10 ? `0${timer}` : timer}
          </span>
        </div>
        <button
          className={`w-full px-4 py-2 text-white rounded-lg transition duration-300 ${
            isOtpValid ? "bg-primary" : "bg-primary opacity-50"
          }`}
          onClick={validateOtp}
          disabled={!isOtpValid}
        >
          Verify & continue
        </button>
      </div>
    </div>
  );
};

export default Otp;
