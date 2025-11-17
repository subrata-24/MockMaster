import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaFileUpload, FaTrashAlt, FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../../App";
import { validateEmail, validatePassword } from "../../utils/helper";

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef();
  /* 
    - useRef creates a reference ("box") to store the hidden file input element.
    - This allows us to programmatically trigger a click on the hidden input when the upload icon/button is clicked,
    - opening the file browser dialog without showing the default input UI.
  */

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (fullName.length < 2) {
      setError("Name must contain at least 2 character");
      return;
    }
    setError(null);
    if (!validateEmail(email)) {
      setError("Email is not correct");
      return;
    }

    const passVal = validatePassword(password);
    if (passVal) {
      setError(passVal);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/auth/sign-up`,
        formData
      );

      setCurrentPage("otp");

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle password visibility on eye icon click
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle image file selection from hidden input
  const handleImage = (e) => {
    setBackendImage(e.target.files[0]);
    const file = e.target.files[0];
    // Create a local URL for previewing the uploaded file
    setImage(URL.createObjectURL(file));
  };

  // Trigger file input click when upload icon/button is clicked
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  // Remove the uploaded image and reset image state
  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Create Account</h3>
        <p className="text-sm text-gray-400">
          Join us today by providing your details
        </p>
      </div>

      {/* Signup Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Hidden File Input for Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          style={{ display: "none" }} //For this the input field is not shows
          ref={fileInputRef} // Ref to programmatically click this input
        />

        {/* When image exist */}
        {image ? (
          <div className="relative w-20 h-20 mx-auto mb-1 flex items-center justify-center">
            <img
              src={image}
              alt="User"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-700 shadow-md"
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="absolute bottom-0 right-1 bg-black/60 rounded-full p-2 text-red-400 hover:text-white hover:bg-gray-700 transition duration-300"
            >
              <FaTrashAlt size={18} />
            </button>
          </div>
        ) : (
          // When image doesn't exist
          <button
            type="button"
            onClick={handleImageUpload}
            className="relative bg-gray-700 w-20 h-20 flex items-center justify-center mx-auto rounded-full text-gray-400 hover:text-white transition shadow-md"
          >
            <FaUser size={34} />
            <span className="absolute bottom-2 right-2 bg-gray-900 rounded-full p-1 shadow hover:bg-gray-800 transition">
              <FaFileUpload size={18} />
            </span>
          </button>
        )}
        <div className="text-center text-xs text-gray-400 mb-4">
          {image ? "Change profile" : "Upload image"}
        </div>

        {/* Full name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer hover:scale-105"
        >
          Sign Up
        </button>
      </form>

      {/* Log in Link */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setCurrentPage("login")}
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
