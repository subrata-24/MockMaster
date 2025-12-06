import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIAnswerPreview from "./AIAnswerPreview";

const QuestionCard = ({ question }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isPin, setIsPin] = useState(false);

  return (
    <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 my-4 shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Top Row */}
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-100">
          {question.question}
        </h3>

        {/* Right Buttons */}
        <div className="flex items-center gap-3 w-[25%]">
          {/* Pin Button */}
          <button
            onClick={() => setIsPin(!isPin)}
            className={`p-2 rounded-md transition-all ${
              isPin
                ? "text-yellow-400 bg-gray-700"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            {isPin ? <LuPinOff size={18} /> : <LuPin size={18} />}
          </button>

          {/* Learn More */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition">
            <LuSparkles size={18} />
            <span className="hidden md:block">Learn More</span>
          </button>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpand(!isExpand)}
            className="p-2 text-gray-300 hover:text-white transition"
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
      {isExpand && (
        <p className="mt-4 text-gray-300 text-sm leading-relaxed animate-fadeIn">
          <AIAnswerPreview content={question.answer} />
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
