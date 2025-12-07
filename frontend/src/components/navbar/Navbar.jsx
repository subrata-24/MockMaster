import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAuthModal, setUserData } from "../../redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../../App";
import { LuLogOut, LuUser, LuChevronDown, LuSparkles } from "react-icons/lu";

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
      <header className="flex justify-between items-center mb-8 relative">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            {/* Icon Container */}
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <LuSparkles className="text-white" size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MockMaster 2.0
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              The AI Interview Coach
            </p>
          </div>
        </div>

        {userData ? (
          <div className="relative">
            {/* User Profile Button */}
            <button
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setShowInfo((prev) => !prev)}
            >
              {/* Profile Image or Initial */}
              {userData.profileImageUrl ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img
                    src={userData.profileImageUrl}
                    alt="Profile"
                    className="relative w-10 h-10 rounded-full object-cover border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg border-2 border-cyan-500/30">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}

              {/* User Info */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {userData.name}
                </p>
                <p className="text-xs text-slate-400 truncate max-w-[150px]">
                  {userData.email}
                </p>
              </div>

              {/* Dropdown Arrow */}
              <LuChevronDown
                className={`text-slate-400 group-hover:text-slate-300 transition-all duration-300 ${
                  showInfo ? "rotate-180" : ""
                }`}
                size={18}
              />
            </button>

            {/* Dropdown Menu */}
            {showInfo && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowInfo(false)}
                ></div>

                {/* Dropdown Content */}
                <div className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-slate-800/95 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden z-50 animate-fadeIn">
                  {/* User Info Section */}
                  <div className="p-5 border-b border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      {userData.profileImageUrl ? (
                        <img
                          src={userData.profileImageUrl}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/50"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg border-2 border-cyan-500/30">
                          {userData.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-slate-100 truncate">
                          {userData.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div className="p-3">
                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-red-600/10 to-red-700/10 hover:from-red-600/20 hover:to-red-700/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 group/logout cursor-pointer font-semibold"
                    >
                      <LuLogOut
                        size={18}
                        className="group-hover/logout:scale-110 transition-transform"
                      />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          // Login Button
          <button
            onClick={() => dispatch(setOpenAuthModal(true))}
            className="relative group overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button Content */}
            <span className="relative flex items-center gap-2">
              <LuUser size={18} />
              <span>Login / Sign Up</span>
            </span>
          </button>
        )}
      </header>
    </div>
  );
};

export default Navbar;
