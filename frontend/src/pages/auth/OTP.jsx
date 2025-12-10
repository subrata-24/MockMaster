import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../App";
import toast from "react-hot-toast";
import { LuShieldCheck, LuRotateCw, LuClock } from "react-icons/lu";

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
      toast.success("OTP sent again");
    } catch (error) {
      console.log(error);
      setShowError(error?.response?.data?.message || "Something went wrong");
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header with Icon */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-4">
          <LuShieldCheck className="text-cyan-400" size={32} />
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Verify Your Email
        </h3>
        <p className="text-sm text-slate-400">
          Enter the verification code sent to your email
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* OTP Input */}
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-semibold text-slate-300 mb-2"
          >
            Verification Code
          </label>
          <input
            type="text"
            id="otp"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full bg-slate-800/50 text-slate-100 text-center text-2xl font-bold tracking-[0.5em] border border-slate-700/50 rounded-xl px-4 py-4 placeholder:text-slate-600 placeholder:tracking-normal placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
            required
          />
        </div>

        {/* Error Message */}
        {showError && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{showError}</span>
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
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
              <span>Verifying...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <LuShieldCheck size={18} />
              <span>Verify & Continue</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default OTP;
