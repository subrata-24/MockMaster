import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuBriefcase,
  LuLayers,
  LuTarget,
  LuArrowRight,
  LuTrash2,
} from "react-icons/lu";
import axios from "axios";
import { serverUrl } from "../../App";

const SessionCard = ({ session, onDeleteSession }) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async (e) => {
    e.stopPropagation();
    onDeleteSession();
    setShowDeleteConfirm(false);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Top Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

      <div className="relative z-10 p-6">
        {/* Header - Role Title with Delete Button */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <h2 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2 leading-tight flex-1">
            {session.role}
          </h2>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-gradient-to-r from-gray-600 via-gray-800 to-gray-950 transition-all duration-300 hover:scale-110 cursor-pointer group/delete"
            title="Delete Session"
          >
            <LuTrash2
              size={18}
              className="group-hover/delete:scale-110 transition-transform "
            />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {/* Experience */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <LuBriefcase size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Experience
              </p>
              <p className="text-sm font-semibold text-slate-200">
                {session.experience}{" "}
                {session.experience === 1 ? "Year" : "Years"}
              </p>
            </div>
          </div>

          {/* Topics to Focus */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <LuTarget size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Focus Topics
              </p>
              <p className="text-sm font-semibold text-slate-200 line-clamp-1">
                {session.topicsToFocus}
              </p>
            </div>
          </div>

          {/* Questions Count */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <LuLayers size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Questions
              </p>
              <p className="text-sm font-semibold text-slate-200">
                {session.questions.length} Available
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer group/btn"
          onClick={() => navigate(`/interview-prep/${session._id}`)}
        >
          <span>Start Learning</span>
          <LuArrowRight
            size={20}
            className="group-hover/btn:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>

      {/* Bottom Shine Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Delete Confirmation Modal Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm rounded-2xl p-6">
          <div className="text-center space-y-4">
            {/* Warning Icon */}
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-gray-600 via-gray-800 to-gray-900">
                <LuTrash2
                  className="group-hover/delete:scale-110 transition-transform"
                  size={32}
                />
              </div>
            </div>

            {/* Text */}
            <h3 className="text-xl font-bold text-slate-100">
              Delete Session?
            </h3>
            <p className="text-sm text-slate-400">
              This will permanently delete this interview prep session. This
              action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionCard;
