import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        //The toastOptions prop allows to customize the appearance and behavior of all toast notifications in app.It is not mandatory.Just for customize toaster.
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
};

export default App;
