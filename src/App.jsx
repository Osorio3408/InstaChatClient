import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chats } from "./Pages/Chats/Chats";
import { SignIn } from "./Pages/SignIn/SignIn";
import { SignUp } from "./Pages/SignUp/SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerifyAccount } from "./Pages/VerifyAccount/VerifyAccount";
import { AuthUser } from "./Context/UserContext";
import { Home } from "./Pages/Home/Home";
import { NewPost } from "./Pages/NewPost/NewPost";

export const App = () => {
  return (
    <AuthUser>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/NewPost" element={<NewPost />} />
          <Route
            path="/VerifyAccount/:userId/:token"
            element={<VerifyAccount />}
          />
        </Routes>
      </Router>
    </AuthUser>
  );
};
