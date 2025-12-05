import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import RoleInfoHeader from "../../components/cards/RoleInfoHeader";
import moment from "moment/moment";
import QuestionCard from "../../components/cards/QuestionCard";

const InterviewPrep = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const fetchSessionById = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/session/get-session-by-id/${id}`,
        { withCredentials: true }
      );
      setSessionData(result.data?.session);
      // console.log(result.data?.session);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSessionById();
    }
  }, [id]);

  console.log(sessionData);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-50">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-teal-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-teal-600/15 to-blue-600/15 rounded-full blur-[120px]"></div>
      </div>

      <div className="p-2">
        <Navbar />

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

        {sessionData?.questions.map((question, index) => {
          return <QuestionCard key={index} question={question} />;
        })}
      </div>
    </div>
  );
};

export default InterviewPrep;
