import React from "react";
import { FormOpinion } from "../../UI/FormOpinion/FormOpinion";

export const FormOpinions = () => {
  return (
    <div className="hidden xl:flex flex-col justify-center items-center w-2/5 gap-14 shadow-md shadow-neutral-800">
      <FormOpinion />
      <FormOpinion />
      <FormOpinion />
    </div>
  );
};
