import React from "react";
import { ImSpinner6 } from "react-icons/im";

export const FormBtn = ({ btn, onClick, isLoading }) => {
  return (
    <button
      className="bg-blue-900 w-52 md:w-72 py-2 md:py-4 rounded-lg text-white font-bold text-xl md:text-2xl hover:bg-blue-950 flex justify-center"
      onClick={onClick}>
      {isLoading ? <ImSpinner6 className="text-4xl animate-spin" /> : btn}
    </button>
  );
};
