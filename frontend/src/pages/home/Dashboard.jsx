import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import { LuPlus } from "react-icons/lu";
import Modal from "../../components/loader/Modal.jsx";
import { setCurrentPage, setOpenAuthModal } from "../../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CreateSession from "../../components/inputs/createSession.jsx";

const Dashboard = () => {
  const { openAuthModal, currentPage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddNew = () => {
    dispatch(setOpenAuthModal(true));
    dispatch(setCurrentPage("add-session"));
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-50">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-teal-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-teal-600/15 to-blue-600/15 rounded-full blur-[120px]"></div>
      </div>
      <Navbar />
      <button
        className="py-2 px-4 bg-gray-700 flex items-center justify-center gap-3 font-bold rounded-full fixed bottom-10 right-10 cursor-pointer"
        onClick={handleAddNew}
      >
        <LuPlus />
        Add New
      </button>

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
  );
};

export default Dashboard;
