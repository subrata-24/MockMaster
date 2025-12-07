import React from "react";
import { LuBriefcase, LuCalendar, LuLayers, LuTarget } from "react-icons/lu";

const RoleInfoHeader = ({
  role,
  questions,
  experience,
  topicsToFocus,
  lastUpdated,
}) => {
  return (
    <div className="w-full">
      {/* Role Title with Gradient */}
      <div className="text-center mb-8">
        <div className="inline-block">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent pb-2 animate-gradient">
            {role}
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Topics Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-5 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                <LuTarget size={20} />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Focus Areas
              </span>
            </div>
            <p className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Experience Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <LuBriefcase size={20} />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Experience
              </span>
            </div>
            <p className="text-lg font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
              {experience} {experience == 1 ? "Year" : "Years"}
            </p>
          </div>
        </div>

        {/* Questions Count Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <LuLayers size={20} />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Questions
              </span>
            </div>
            <p className="text-lg font-semibold text-slate-100 group-hover:text-purple-300 transition-colors">
              {questions.length} Total
            </p>
          </div>
        </div>

        {/* Date Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-5 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                <LuCalendar size={20} />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Last Updated
              </span>
            </div>
            <p className="text-lg font-semibold text-slate-100 group-hover:text-violet-300 transition-colors">
              {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
