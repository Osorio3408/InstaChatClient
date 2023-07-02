import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chats } from "./Pages/Chats/Chats";
import { SignIn } from "./Pages/SignIn/SignIn";
import { SignUp } from "./Pages/SignUp/SignUp";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Chats />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
};
