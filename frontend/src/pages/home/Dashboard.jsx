import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import { LuPlus, LuRocket, LuSparkles } from "react-icons/lu";
import Modal from "../../components/loader/Modal.jsx";
import { setCurrentPage, setOpenAuthModal } from "../../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CreateSession from "../../components/inputs/createSession.jsx";
import axios from "axios";
import { serverUrl } from "../../App.jsx";
import { setSessionData } from "../../redux/SessionSlice.js";
import SessionCard from "../../components/cards/SessionCard.jsx";
import { HandHelping } from "lucide-react";
import Footer from "../../components/Footer.jsx";

const Dashboard = () => {
  const { openAuthModal, currentPage, userData } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { sessionData } = useSelector((state) => state.session);

  const handleAddNew = () => {
    dispatch(setOpenAuthModal(true));
    dispatch(setCurrentPage("add-session"));
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/session/delete-session-by-id/${sessionId}`,
        { withCredentials: true }
      );
      console.log(response);
      if (response.data?.success === true) {
        getAllSession();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSession = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/session/get-all-sessions`,
        { withCredentials: true }
      );
      dispatch(setSessionData(response?.data?.sessions));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSession();
  }, [userData]);

  console.log(sessionData);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-full blur-[140px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-tl from-violet-500/8 via-purple-500/8 to-fuchsia-500/8 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none"></div>

      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <Navbar />

        <div className="max-w-[1600px] mx-auto mt-8">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <LuSparkles className="text-cyan-400" size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Interview Prep Sessions
              </h1>
            </div>
            <p className="text-slate-400 text-lg ml-14">
              Master your interviews with AI-powered preparation
            </p>
          </div>

          {/* Sessions Grid or Empty State */}
          {sessionData && sessionData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sessionData.map((session) => {
                return (
                  <SessionCard
                    key={session._id}
                    session={session}
                    onDeleteSession={() => handleDeleteSession(session._id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              {/* Empty State Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-12 max-w-2xl w-full text-center">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative p-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700">
                        <LuRocket className="text-cyan-400" size={56} />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <h2 className="text-3xl font-bold text-slate-100 mb-4">
                    No Sessions Yet
                  </h2>
                  <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                    Create your first interview prep session and take one step
                    closer to landing your dream job
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={handleAddNew}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 cursor-pointer"
                  >
                    <LuPlus size={24} />
                    <span>Create Your First Session</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        {sessionData && sessionData.length > 0 && (
          <button
            className="group fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-full shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 cursor-pointer z-50"
            onClick={handleAddNew}
          >
            <LuPlus
              size={24}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span className="hidden sm:inline">Add New Session</span>
          </button>
        )}

        {/* Modal */}
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            dispatch(setOpenAuthModal(false));
            dispatch(setCurrentPage("login"));
          }}
        >
          <div>{currentPage == "add-session" && <CreateSession />}</div>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
