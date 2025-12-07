import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import RoleInfoHeader from "../../components/cards/RoleInfoHeader";
import moment from "moment/moment";
import QuestionCard from "../../components/cards/QuestionCard";
import ExplanationCard from "../../components/cards/ExplanationCard";

const InterviewPrep = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [isExplanation, setIsExplanation] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const fetchSessionById = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/session/get-session-by-id/${id}`,
        { withCredentials: true }
      );
      setSessionData(result.data?.session);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSessionById();
    }
  }, [id]);

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/question/${questionId}/pin`,
        {},
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePinToggle = async (questionId) => {
    await toggleQuestionPinStatus(questionId);
    await fetchSessionById();
  };

  const getExplanation = async (question) => {
    setIsLoading(true);
    setExplanation(null);
    setError(null);
    try {
      const response = await axios.post(
        `${serverUrl}/api/ai/question-explanation`,
        { question },
        { withCredentials: true }
      );
      setExplanation(response.data.data);
      console.log(explanation);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsExplanation(false);
    setError(null);
    setIsLoading(false);
    setExplanation(null);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-full blur-[140px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-tl from-violet-500/8 via-purple-500/8 to-fuchsia-500/8 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none"></div>

      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <Navbar />

        <div className="max-w-[1600px] mx-auto mt-6">
          <RoleInfoHeader
            role={sessionData?.role || ""}
            description={sessionData?.description || " "}
            questions={sessionData?.questions || " "}
            experience={sessionData?.experience || " "}
            topicsToFocus={sessionData?.topicsToFocus || " "}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                : " "
            }
          />

          {!isExplanation ? (
            <div className="w-full mt-8">
              <div className="grid grid-cols-1 gap-4">
                {(sessionData?.questions || []).map((question) => {
                  return (
                    <QuestionCard
                      key={question._id}
                      question={question}
                      onTogglePin={() => handlePinToggle(question._id)}
                      isPin={question.isPinned}
                      onLearnMore={() => getExplanation(question)}
                      setIsExplanation={() => setIsExplanation(true)}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 mt-8">
              <div className="w-full lg:w-[58%]">
                <div className="grid grid-cols-1 gap-4">
                  {(sessionData?.questions || []).map((question) => {
                    return (
                      <QuestionCard
                        key={question._id}
                        question={question}
                        onTogglePin={() => handlePinToggle(question._id)}
                        isPin={question.isPinned}
                        onLearnMore={() => getExplanation(question)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="w-full lg:w-[42%] lg:sticky lg:top-6 lg:self-start">
                <ExplanationCard
                  onClose={handleClose}
                  explanation={explanation}
                  error={error}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
