import axios from "axios";
import React, { useState } from "react";
import { serverUrl } from "../../App.jsx";
import toast from "react-hot-toast";
import { LuMail, LuSend } from "react-icons/lu";

const EmailVerification = ({ handleForgetPasswordOTP }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/forget-passowrd-otp`,
        { email }
      );
      const time = response.data?.user?.expiryTime;
      toast.success("OTP sent successfully");
      handleForgetPasswordOTP(email, time);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header with Icon */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-4">
          <LuMail className="text-cyan-400" size={32} />
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Email Verification
        </h3>
        <p className="text-sm text-slate-400">
          Enter your email address to receive a verification code
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LuMail className="text-slate-500" size={20} />
            </div>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800/50 text-slate-100 border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
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
            <span>{error}</span>
          </div>
        )}

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
              <span>Sending OTP...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <LuSend size={18} />
              <span>Send Verification Code</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
