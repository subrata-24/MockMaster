import axios from "axios";
import React, { useState } from "react";
import { serverUrl } from "../../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Sparkles, Target, Clock, FileText, Briefcase } from "lucide-react";

const CreateSession = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [topicsToFocus, setTopicsToFocus] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill out all this information");
      return;
    }

    setIsLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/ai/question-answer`,
        {
          role,
          experience: parseInt(experience),
          topicsToFocus,
          numberOfQuestions: 10,
        },
        { withCredentials: true }
      );

      const response = await axios.post(
        `${serverUrl}/api/session/create-session`,
        {
          role,
          experience: parseInt(experience),
          topicsToFocus,
          description,
          questions: result.data.data,
        },
        { withCredentials: true }
      );

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
      toast.success("Session created successfully");
      // console.log(result.data.data);
      // console.log(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error("Failed to create session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full max-h-[85vh] overflow-y-auto scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Header Section */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full mb-3 shadow-lg">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Start Your Interview Journey
        </h3>
        <p className="text-sm text-gray-400">
          Unlock personalized interview questions tailored to your career goals
        </p>
      </div>

      <div className="space-y-3">
        {/* Role Field */}
        <div className="group">
          <label
            htmlFor="role"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
          >
            <Briefcase className="w-4 h-4 text-blue-400" />
            Target Role <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="role"
            placeholder="e.g., Frontend Developer, UI/UX Designer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
          />
        </div>

        {/* Experience Field */}
        <div className="group">
          <label
            htmlFor="experience"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
          >
            <Clock className="w-4 h-4 text-teal-400" />
            Years of Experience <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            id="experience"
            placeholder="e.g., 0, 1, 2, 5+"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            min="0"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
          />
        </div>

        {/* Topics Field */}
        <div className="group">
          <label
            htmlFor="topics"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
          >
            <Target className="w-4 h-4 text-blue-400" />
            Focus Topics <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="topics"
            placeholder="e.g., React, Node.js, MongoDB, TypeScript"
            value={topicsToFocus}
            onChange={(e) => setTopicsToFocus(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Separate topics with commas
          </p>
        </div>

        {/* Description Field */}
        <div className="group">
          <label
            htmlFor="description"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
          >
            <FileText className="w-4 h-4 text-teal-400" />
            Session Description{" "}
            <span className="text-gray-500 font-normal">(Optional)</span>
          </label>
          <textarea
            id="description"
            placeholder="Any specific goals or notes for this session..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-500 resize-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {isLoading ? (
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
              Creating Session...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Create Interview Session
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          )}
        </button>

        {/* Footer Info */}
        <div className="pt-4 border-t border-gray-700">
          <p className="text-center text-xs text-gray-500">
            🎯 You'll receive{" "}
            <span className="text-blue-400 font-semibold">
              10 tailored questions
            </span>{" "}
            based on your inputs
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
