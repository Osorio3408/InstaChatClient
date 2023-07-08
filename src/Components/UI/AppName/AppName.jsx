import React from "react";
import { Link } from "react-router-dom";

export const AppName = () => {
  return (
    <Link to={"/"}>
      <h1 className="text-blue-700 text-5xl md:text-6xl xl:text-7xl font-bold text-center">
        InstaChat
      </h1>
    </Link>
  );
};
