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
    onLearnMore();
    setIsExplanation();
  };

  return (
    <motion.div
      layout
      initial={false}
      transition={{ layout: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] } }}
      whileHover={{ scale: 1.01 }}
      className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 my-4 shadow-md transition-all duration-300 hover:shadow-lg"
    >
      {/* Top Row */}
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-100">
          {question.question}
        </h3>

        {/* Right Buttons */}
        <div className="flex items-center gap-3 w-[25%]">
          {/* Pin Button */}
          <button
            onClick={handlePinToggle}
            className={`p-2 rounded-md transition-all flex items-center justify-center ${
              isPin
                ? "text-yellow-400 bg-gray-700"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            } cursor-pointer`}
            aria-pressed={isPin}
            title={isPin ? "Unpin" : "Pin"}
          >
            {isPin ? <LuPinOff size={18} /> : <LuPin size={18} />}
          </button>

          {/* Learn More */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition cursor-pointer"
            onClick={handleLearnMore}
          >
            <LuSparkles size={18} />
            <span className="hidden md:block">Learn More</span>
          </button>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpand(!isExpand)}
            className="p-2 text-gray-300 hover:text-white transition"
            aria-expanded={isExpand}
          >
            <FaChevronDown
              className={`text-lg transform transition duration-300 ${
                isExpand ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Answer */}
      <motion.div
        initial={false}
        animate={{ height: isExpand ? "auto" : 0, opacity: isExpand ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {isExpand && (
          <p className="mt-4 text-gray-300 text-sm leading-relaxed animate-fadeIn">
            <AIAnswerPreview content={question.answer} />
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;
