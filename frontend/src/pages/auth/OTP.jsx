import axios from "axios";
import React, { useState } from "react";
import { serverUrl } from "../../App";

const OTP = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(otp);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-signup-otp`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Verify OTP</h3>
        <p className="text-sm text-gray-400">
          Check your email and verify your OTP
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Type OTP
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter verification OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer hover:scale-105"
        >
          Submit OTP
        </button>
      </form>
    </div>
  );
};

export default OTP;
