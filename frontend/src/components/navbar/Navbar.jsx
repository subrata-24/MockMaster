import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAuthModal, setUserData } from "../../redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../../App";

const Navbar = () => {
  const { userData, openAuthModal } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/sign-out`, {
        withCredentials: true,
      });
      toast.success(result.data.message || "Successfully logged out");
      setShowInfo(false);
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Logout failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-12 relative">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Interview Preparation AI
        </div>

        {userData ? (
          <div className="relative">
            <div
              className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-full border border-gray-700 shadow-lg hover:border-gray-600 transition-all duration-300 cursor-pointer"
              onClick={() => setShowInfo((prev) => !prev)}
            >
              {userData.profileImageUrl ? (
                <img
                  src={userData.profileImageUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center font-bold text-white text-lg shadow-md">
                  {userData.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-white">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-400 truncate max-w-[150px]">
                  {userData.email}
                </p>
              </div>
              {/* Dropdown Arrow Icon */}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                  showInfo ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {showInfo && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden z-50 animate-fadeIn">
                {/* User Info Section */}
                <div className="px-4 py-4 border-b border-gray-700 bg-gray-800/50">
                  <p className="text-lg font-bold text-white">
                    {userData.name}
                  </p>
                </div>

                {/* Logout Button */}
                <div className="p-2">
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center gap-3 px-4 text-left text-red-400 rounded-lg transition-all duration-300 group cursor-pointer hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-bold">Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Show Login Button
          <button
            onClick={() => dispatch(setOpenAuthModal(true))}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer hover:scale-105"
          >
            Login / Sign Up
          </button>
        )}
      </header>
    </div>
  );
};

export default Navbar;
