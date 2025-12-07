import React from "react";
import AIAnswerPreview from "./AIAnswerPreview";

const ExplanationCard = ({ onClose, explanation, error, isLoading }) => {
  return (
    <div>
      <button
        onClick={onClose}
        className="right-4 top-4 font-bold cursor-pointer"
      >
        x
      </button>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating Explanation...
          </span>
        </div>
      ) : error ? (
        <div>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h1>{explanation?.title}</h1>
          <AIAnswerPreview content={explanation?.explanation} />
        </div>
      )}
    </div>
  );
};

export default ExplanationCard;
