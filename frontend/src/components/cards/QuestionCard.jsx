import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIAnswerPreview from "./AIAnswerPreview";
import { motion } from "framer-motion";

const QuestionCard = ({
  question,
  onTogglePin,
  isPin,
  onLearnMore,
  setIsExplanation,
}) => {
  const [isExpand, setIsExpand] = useState(false);

  const handlePinToggle = (e) => {
    e.stopPropagation();
    onTogglePin();
  };

  const handleLearnMore = () => {
    onLearnMore(question.question);
    setIsExplanation();
  };

  return (
    <motion.div
      layout
      initial={false}
      transition={{ layout: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-300 ${
        isPin
          ? "bg-gradient-to-br from-amber-900/20 to-slate-800/40 border-2 border-amber-500/40 shadow-lg shadow-amber-500/10"
          : "bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700/50 hover:border-slate-600/70"
      }`}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Pinned Badge */}
      {isPin && (
        <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl shadow-lg">
          PINNED
        </div>
      )}

      <div className="relative z-10 p-5 md:p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg md:text-xl font-semibold text-slate-100 leading-relaxed pr-4 group-hover:text-cyan-300 transition-colors duration-300">
            {question.question}
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Pin Button */}
            <button
              onClick={handlePinToggle}
              className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isPin
                  ? "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 shadow-md"
                  : "text-slate-400 hover:text-amber-400 bg-slate-700/50 hover:bg-amber-500/10"
              } cursor-pointer hover:scale-110 active:scale-95`}
              aria-pressed={isPin}
              title={isPin ? "Unpin Question" : "Pin Question"}
            >
              {isPin ? <LuPinOff size={18} /> : <LuPin size={18} />}
            </button>

            {/* Learn More Button */}
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-300 hover:text-cyan-300 bg-slate-700/50 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 cursor-pointer group/btn hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 active:scale-95 border border-slate-600/50 hover:border-cyan-500/50"
              onClick={handleLearnMore}
            >
              <LuSparkles
                size={18}
                className="group-hover/btn:rotate-12 transition-transform duration-300"
              />
              <span className="hidden sm:block font-medium">AI Explain</span>
            </button>

            {/* Expand Button */}
            <button
              onClick={() => setIsExpand(!isExpand)}
              className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
                isExpand
                  ? "text-cyan-400 bg-cyan-500/10 shadow-md"
                  : "text-slate-400 hover:text-slate-200 bg-slate-700/50 hover:bg-slate-700"
              }`}
              aria-expanded={isExpand}
              title={isExpand ? "Collapse Answer" : "Expand Answer"}
            >
              <FaChevronDown
                className={`text-lg transform transition-all duration-300 ${
                  isExpand ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Expandable Answer Section */}
        <motion.div
          initial={false}
          animate={{
            height: isExpand ? "auto" : 0,
            opacity: isExpand ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          {isExpand && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <div className="bg-slate-900/40 rounded-xl p-4 backdrop-blur-sm">
                <AIAnswerPreview content={question.answer} />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className={`h-1 w-0 group-hover:w-full transition-all duration-500 ${
          isPin
            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"
            : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
        }`}
      ></div>
    </motion.div>
  );
};

export default QuestionCard;
