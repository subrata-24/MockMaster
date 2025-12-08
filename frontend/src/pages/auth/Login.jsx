import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../../App";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/userSlice";

const Login = ({ handleSuccessSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      toast.success(result.data.message || "Login successfully");
      handleSuccessSignIn(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(
        error.response?.data?.error ||
          "Something went wrong. Please try again later"
      );
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Handle show password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Welcome back</h3>
        <p className="text-sm text-gray-400">
          Please enter your details to log in
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 pr-12 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />

            {/* The eye icon button must have type="button" because buttons inside <form> elements default to type="submit", which triggers form submission and page refresh. */}
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Forget Password */}
        <div className="text-sm text-gray-400">
          <button
            type="button"
            onClick={() => dispatch(setCurrentPage("email"))}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline cursor-pointer"
          >
            Forget Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer hover:scale-105"
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
              Verifying...
            </span>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => dispatch(setCurrentPage("signup"))}
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
