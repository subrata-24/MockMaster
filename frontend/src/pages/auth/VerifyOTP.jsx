import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbReload } from "react-icons/tb";
import { serverUrl } from "../../App";

const VerifyOTP = ({ email, time: initialTime }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [expiryTime, setExpiryTIme] = useState(initialTime);

  console.log("time =", expiryTime, "type =", typeof expiryTime);

  useEffect(() => {
    if (!expiryTime) {
      setRemainingMs(0);
      return;
    }
    const update = () => {
      const diff = Math.max(0, new Date(expiryTime).getTime() - Date.now());
      //time is in ISO formate
      setRemainingMs(diff);
    };
    update();
    const id = setInterval(update, 500); //For update the remainings time after every 500ms.After every 500 the useEffect is run than reset the remaining time and the page/component
    return () => clearInterval(id);
  }, [expiryTime]);

  const formatMs = (ms) => {
    const totalSec = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const canResend = remainingMs === 0;

  const handleSubmit = async () => {};

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setIsResending(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/forget-passowrd-otp`,
        { email }
      );
      //   console.log(response.data?.user?., setExpiryTIme) =;
      const time = response.data?.user?.expiryTime;
      setExpiryTIme(time);
      toast.success("OTP sent again");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">OTP Verification</h3>
        <p className="text-sm text-gray-400">
          Please enter the OTP sent to your email
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* OTP Field */}
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            otp
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter your otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Resend/Timer */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || isResending}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
              canResend
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            <TbReload className={isResending ? "animate-spin" : ""} />
            {isResending ? "Resending..." : canResend ? "Get Code" : "Resend"}
          </button>

          {!canResend && (
            <div className="text-sm text-gray-400">
              Try again in{" "}
              <strong className="text-white">{formatMs(remainingMs)}</strong>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer hover:scale-105"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying OTP...
            </span>
          ) : (
            "Verify OTP"
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
