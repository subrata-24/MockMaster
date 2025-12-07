import React from "react";
import AIAnswerPreview from "./AIAnswerPreview";
import { LuX, LuSparkles } from "react-icons/lu";
import { LucideAlertTriangle } from "lucide-react";

const ExplanationCard = ({ onClose, explanation, error, isLoading }) => {
  return (
    <div className="sticky top-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden">
      {/* Header with Gradient */}
      <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <LuSparkles className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Explanation</h2>
              <p className="text-xs text-white/80">Powered by Advanced AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Close explanation"
          >
            <LuX size={20} />
          </button>
        </div>
        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-6 fill-slate-800/80"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              {/* Spinning Gradient Ring */}
              <div className="w-20 h-20 rounded-full border-4 border-slate-700/30"></div>
              <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-cyan-500 border-r-blue-500 animate-spin"></div>
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <LuSparkles className="text-cyan-400 animate-pulse" size={28} />
              </div>
            </div>
            <p className="mt-6 text-slate-300 font-medium text-lg animate-pulse">
              Generating Explanation...
            </p>
            <p className="mt-2 text-slate-500 text-sm">
              AI is analyzing the question
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="p-4 rounded-full bg-red-500/10 mb-4">
              <LucideAlertTriangle className="text-red-400" size={48} />
            </div>
            <h3 className="text-xl font-semibold text-red-400 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-slate-400 text-center">
              {error?.message ||
                "Unable to generate explanation. Please try again."}
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all duration-300 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : explanation ? (
          <div className="space-y-4">
            {/* Title Section */}
            {explanation?.title && (
              <div className="mb-6 pb-4 border-b border-slate-700/50">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {explanation.title}
                </h3>
              </div>
            )}

            {/* Explanation Content */}
            <div className="prose prose-invert max-w-none">
              <AIAnswerPreview content={explanation?.explanation} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="p-4 rounded-full bg-slate-700/30 mb-4">
              <LuSparkles size={48} className="text-slate-500" />
            </div>
            <p className="text-center">
              Click "AI Explain" on any question to get detailed insights
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationCard;
