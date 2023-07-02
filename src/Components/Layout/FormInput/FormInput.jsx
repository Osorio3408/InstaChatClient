import React from "react";

export const FormInput = ({ type, label, span, placeholder }) => {
  return (
    <div className="flex flex-col justify-center w-full xl:w-5/6 gap-2">
      <label
        htmlFor={type}
        className="text-lg md:text-2xl text-white font-medium">
        {label}
      </label>
      <input
        type={type}
        name={type}
        id={type}
        className="bg-neutral-800 py-3 md:py-4 px-4 text-gray-200 rounded-md focus:outline-none text-lg md:text-xl"
        placeholder={placeholder}
      />
      {span && (
        <span className="text-gray-300 flex items-end justify-end hover:underline underline-offset-4 xl:text-lg">
          {span}
        </span>
      )}
    </div>
  );
};
