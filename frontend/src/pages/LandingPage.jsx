import React, { useState } from "react";
import image from "../assets/image.png";
import { APP_FEATURES } from "../utils/data.js";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Login from "./auth/Login.jsx";
import SignUp from "./auth/SignUp.jsx";
import Modal from "../components/loader/Modal.jsx";
import OTP from "./auth/OTP.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const LandingPage = () => {
  const { userData } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const dispatch = useDispatch();

  const handleSuccessSignIn = (user) => {
    dispatch(setUserData(user));
    setOpenAuthModal(false);
    setCurrentPage("login");
  };

  const handleCTA = () => {};

  const handleLogOut = () => {};
  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-50">
      {/* Gradient Background Effect */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-teal-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-teal-600/15 to-blue-600/15 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
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
              onClick={() => setOpenAuthModal(true)}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer hover:scale-105"
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Content */}
        <section className="flex flex-col md:flex-row items-center gap-8 mb-20">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <LuSparkles /> AI Powered
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Crack Interview with <br />
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Learning
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Get role-specific questions, expand answers when you need them,
              dive deeper into concepts, and organize everything your own way.
              From preparation to mastery—your ultimate toolkit is here.
            </p>

            <button
              className="group bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
              onClick={handleCTA}
            >
              <span className="flex items-center gap-2">
                Get Started
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-xl blur-xl"></div>
              <img
                src={image}
                alt="Interview Prep Dashboard"
                className="relative w-full rounded-xl shadow-2xl border border-gray-700"
              />
            </div>
          </div>
        </section>

        {/* Features Section - Professional Dark Theme */}
        <section className="py-24 px-4 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Features that make you{" "}
                <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  shine
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Everything you need to master interviews and land your dream job
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {APP_FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="group bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-6">
                    {(feature.id === "02" || feature.id === "04") && (
                      <span className="text-xs font-semibold text-teal-400 bg-teal-400/10 px-2 py-1 rounded-full border border-teal-400/30">
                        AI-Powered
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base">
                    {feature.description}
                  </p>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-teal-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Authentication Modal - Conditionally renders Login or SignUp components based on currentPage state. Modal resets to login view on close. */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
      >
        <div>
          {/*Pass setCurrentPage function as prop to child components to allow switching between signup/login views.In login and signup page there is "setCurrentPage" named function*/}
          {currentPage == "login" && (
            <Login
              setCurrentPage={setCurrentPage}
              handleSuccessSignIn={handleSuccessSignIn}
            />
          )}
          {currentPage == "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
          {currentPage == "otp" && (
            <OTP handleSuccessSignIn={handleSuccessSignIn} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
