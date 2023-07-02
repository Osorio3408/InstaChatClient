import React from "react";

export const FormBtn = ({ btn }) => {
  return (
    <button className="bg-blue-900 w-52 md:w-72 py-2 md:py-4 rounded-lg text-white font-bold text-xl md:text-2xl hover:bg-blue-950">
      {btn}
    </button>
  );
};
