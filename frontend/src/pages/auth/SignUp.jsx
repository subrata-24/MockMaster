import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuEye,
  LuEyeOff,
  LuUser,
  LuMail,
  LuLock,
  LuUpload,
  LuTrash2,
  LuUserPlus,
} from "react-icons/lu";
import axios from "axios";
import { serverUrl } from "../../App";
import { validateEmail, validatePassword } from "../../utils/helper";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/userSlice";

const SignUp = ({ handleSuccessSignUp }) => {
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    if (fullName.length < 2) {
      setError("Name must contain at least 2 character");
      return;
    }
    setError(null);
    if (!validateEmail(email)) {
      setError("Email is not correct");
      return;
    }

    const passVal = validatePassword(password);
    if (passVal) {
      setError(passVal);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/auth/sign-up`,
        formData,
        { withCredentials: true }
      );

      handleSuccessSignUp(result?.data?.otpExpires);
      toast.success("OTP send to your email");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "SignUp failed. Please try again.";
      toast.error(errorMessage);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleImage = (e) => {
    setBackendImage(e.target.files[0]);
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <div className="w-full max-h-screen overflow-hidden py-4">
      {/* Header with Icon - Reduced spacing */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-2">
          <LuUserPlus className="text-cyan-400" size={24} />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
          Create Account
        </h3>
        <p className="text-xs text-slate-400">
          Join us today and start your interview prep journey
        </p>
      </div>

      {/* Signup Form - Reduced spacing */}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          style={{ display: "none" }}
          ref={fileInputRef}
        />

        {/* Profile Image Upload - Smaller size */}
        <div className="flex flex-col items-center gap-1.5">
          {image ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src={image}
                alt="Profile"
                className="relative w-16 h-16 rounded-full object-cover border-4 border-slate-800 shadow-xl"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute -bottom-1 -right-1 p-1.5 bg-red-600 hover:bg-red-500 rounded-full text-white transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <LuTrash2 size={12} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleImageUpload}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-slate-800/50 border-2 border-dashed border-slate-600 group-hover:border-cyan-500/50 transition-all duration-300">
                <LuUser
                  size={28}
                  className="text-slate-500 group-hover:text-cyan-400 transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 p-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white shadow-lg">
                  <LuUpload size={10} />
                </div>
              </div>
            </button>
          )}
          <p className="text-xs text-slate-400">
            {image ? "Click trash to remove" : "Upload profile picture"}
          </p>
        </div>

        {/* Full Name Field - Reduced padding */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold text-slate-300 mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LuUser className="text-slate-500" size={18} />
            </div>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-800/50 text-slate-100 border border-slate-700/50 rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Email Field - Reduced padding */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-slate-300 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LuMail className="text-slate-500" size={18} />
            </div>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800/50 text-slate-100 border border-slate-700/50 rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Password Field - Reduced padding */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-slate-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LuLock className="text-slate-500" size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800/50 text-slate-100 border border-slate-700/50 rounded-xl pl-10 pr-10 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
            </button>
          </div>
        </div>

        {/* Error Message - Compact */}
        {error && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-xl text-xs backdrop-blur-sm">
            <svg
              className="w-4 h-4 flex-shrink-0 mt-0.5"
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

        {/* Submit Button - Reduced padding */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none text-sm"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
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
              <span>Creating Account...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <LuUserPlus size={16} />
              <span>Create Account</span>
            </span>
          )}
        </button>
      </form>

      {/* Login Link - Reduced spacing */}
      <div className="mt-3 text-center">
        <p className="text-xs text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => dispatch(setCurrentPage("login"))}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300 hover:underline cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
