import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
export const serverUrl = "https://mockmaster-3sbr.onrender.com";

const App = () => {
  useGetCurrentUser();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep/:id" element={<InterviewPrep />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        //The toastOptions prop allows to customize the appearance and behavior of all toast notifications in app.It is not mandatory.Just for customize toaster.
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          style: {
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "#f1f5f9",
            fontSize: "14px",
            borderRadius: "12px",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            padding: "12px 16px",
            boxShadow:
              "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)",
            backdropFilter: "blur(10px)",
          },
          // Success Toast
          success: {
            duration: 3000,
            style: {
              background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
              color: "#ffffff",
              border: "1px solid rgba(20, 184, 166, 0.3)",
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(20, 184, 166, 0.2)",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#14b8a6",
            },
          },
          // Error Toast
          error: {
            duration: 4000,
            style: {
              background: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)",
              color: "#ffffff",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(239, 68, 68, 0.2)",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#ef4444",
            },
          },
          // Loading Toast
          loading: {
            style: {
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              color: "#ffffff",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#3b82f6",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
