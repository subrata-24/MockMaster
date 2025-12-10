import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverUrl } from "../../App.jsx";
import toast from "react-hot-toast";
import { validatePassword } from "../../utils/helper.js";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { LucideCheckCircle2 } from "lucide-react";

const ConfirmPassword = ({ handleSuccessSignIn, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const passVal = validatePassword(password);
    if (passVal) {
      setIsLoading(false);
      setError(passVal);
      return;
    }
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/confirm-password`,
        { email, password, confirmPassword },
        { withCredentials: true }
      );
      toast.success(response.data?.message || "Password set successfully");
      handleSuccessSignIn(response.data);
    } catch (error) {
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
          <LuLock className="text-cyan-400" size={32} />
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Create New Password
        </h3>
        <p className="text-sm text-slate-400">
          Your new password must be different from previous passwords
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-300 mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LuLock className="text-slate-500" size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800/50 text-slate-100 border border-slate-700/50 rounded-xl pl-12 pr-12 py-3.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="conPass"
            className="block text-sm font-semibold text-slate-300 mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LuLock className="text-slate-500" size={20} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="conPass"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-800/50 text-slate-100 border border-slate-700/50 rounded-xl pl-12 pr-12 py-3.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              {showConfirmPassword ? (
                <LuEyeOff size={20} />
              ) : (
                <LuEye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
          <p className="text-xs font-semibold text-slate-400 mb-2">
            Password must contain:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-500">
            <li className="flex items-center gap-2">
              <LucideCheckCircle2
                size={14}
                className={
                  password.length >= 8 ? "text-cyan-400" : "text-slate-600"
                }
              />
              <span>At least 8 characters</span>
            </li>
            <li className="flex items-center gap-2">
              <LucideCheckCircle2
                size={14}
                className={
                  /[A-Z]/.test(password) ? "text-cyan-400" : "text-slate-600"
                }
              />
              <span>One uppercase letter</span>
            </li>
            <li className="flex items-center gap-2">
              <LucideCheckCircle2
                size={14}
                className={
                  /[a-z]/.test(password) ? "text-cyan-400" : "text-slate-600"
                }
              />
              <span>One lowercase letter</span>
            </li>
            <li className="flex items-center gap-2">
              <LucideCheckCircle2
                size={14}
                className={
                  /[0-9]/.test(password) ? "text-cyan-400" : "text-slate-600"
                }
              />
              <span>One number</span>
            </li>
          </ul>
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
              <span>Setting Password...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <LucideCheckCircle2 size={18} />
              <span>Reset Password</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ConfirmPassword;
