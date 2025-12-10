import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../App";
import toast from "react-hot-toast";
import { LuClock, LuRotateCw } from "react-icons/lu";

const OTP = ({ handleSuccessSignIn, time: initialTime }) => {
  const [otp, setOtp] = useState("");
  const [showError, setShowError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [expiryTime, setExpiryTime] = useState(initialTime);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(null);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-signup-otp`,
        { otp },
        { withCredentials: true }
      );
      if (result.status == 200) {
        handleSuccessSignIn(result.data.user);
      }
      toast.success("User Created successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";
      toast.error(errorMessage);
      setShowError(
        errorMessage || "Something went wrong.Please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!expiryTime) {
      setRemainingMs(0);
      return;
    }
    const update = () => {
      const diff = Math.max(0, new Date(expiryTime).getTime() - Date.now());
      setRemainingMs(diff);
    };
    update();
    const id = setInterval(update, 500);
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

  const handleResendOtp = async () => {
    setShowError(null);
    setIsResending(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/resend-sign-up-otp`,
        {},
        { withCredentials: true }
      );
      console.log(response?.data?.otpExpires);
      setExpiryTime(response?.data?.otpExpires);
    } catch (error) {
      console.log(error);
      setShowError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Verify OTP</h3>
        <p className="text-sm text-gray-400">
          Check your email and verify your OTP
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Type OTP
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter verification OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        {showError && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
            {showError}
          </div>
        )}

        {/* Timer and Resend Section */}
        <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
          {!canResend ? (
            <div className="flex items-center gap-2 text-slate-400">
              <LuClock size={18} className="text-cyan-400" />
              <span className="text-sm">
                Resend available in{" "}
                <span className="font-bold text-cyan-400">
                  {formatMs(remainingMs)}
                </span>
              </span>
            </div>
          ) : (
            <span className="text-sm text-slate-400">Didn't receive code?</span>
          )}

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || isResending}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              canResend
                ? "bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50 cursor-pointer hover:scale-105"
                : "bg-slate-700/30 text-slate-500 border border-slate-700/30 cursor-not-allowed opacity-50"
            }`}
          >
            <LuRotateCw
              size={16}
              className={isResending ? "animate-spin" : ""}
            />
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </div>

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
              Verifying...
            </span>
          ) : (
            "Submit OTP"
          )}
        </button>
      </form>
    </div>
  );
};

export default OTP;
