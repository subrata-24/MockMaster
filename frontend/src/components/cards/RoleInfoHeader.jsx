import React from "react";

const RoleInfoHeader = ({
  role,
  description,
  questions,
  experience,
  topicsToFocus,
  lastUpdated,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold">{role}</h1>
      </div>
      <div className="mt-4">
        <div className="w-[60%]">
          <div className="flex items-center justify-between">
            <h3 className="bg-gray-700 px-4 text-lg py-2 font-semibold rounded-full">
              Topics to focus: {topicsToFocus}
            </h3>
            <h3 className="bg-gray-700 px-4 text-lg py-2 font-semibold rounded-full">
              {experience} {experience == 1 ? "year" : "years"} of experience
            </h3>
            <h3 className="bg-gray-700 px-4 text-lg py-2 font-semibold rounded-full">
              {questions.length} questions
            </h3>
            <h3 className="bg-gray-700 px-4 text-lg py-2 font-semibold rounded-full">
              Date: {lastUpdated}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
