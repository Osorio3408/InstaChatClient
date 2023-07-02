import React from "react";

export const FormOpinion = () => {
  return (
    <div className="flex items-center w-4/5 p-4 rounded-lg gap-4 bg-neutral-800 shadow-md shadow-neutral-600">
      <div className="w-20 h-20 bg-white rounded-full"></div>
      <div className="flex flex-col">
        <h3 className="text-3xl text-white font-bold">
          Yuliam Andrey Osorio Puerta
        </h3>
        <p className="text-neutral-500 text-lg">
          El mejor aplicativo para charlar con tus amigos.
        </p>
      </div>
    </div>
  );
};
