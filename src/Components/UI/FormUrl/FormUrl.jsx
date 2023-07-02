import React from "react";
import { Link } from "react-router-dom";

export const FormUrl = ({ text, to, link }) => {
  return (
    <div className="flex w-5/6 justify-around relative bottom-5">
      <span className="text-base md:text-2xl font-bold text-white">{text}</span>
      <Link
        to={to}
        className="text-base md:text-2xl font-bold text-blue-700 hover:underline underline-offset-2 hover:text-blue-900">
        {link}
      </Link>
    </div>
  );
};
