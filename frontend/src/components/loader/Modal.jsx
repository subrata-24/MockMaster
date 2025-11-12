import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/25 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative flex flex-col bg-gray-800 rounded-xl shadow-2xl overflow-hidden max-w-md w-full mx-4 border border-gray-700">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
