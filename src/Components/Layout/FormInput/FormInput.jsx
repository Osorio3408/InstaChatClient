import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const FormInput = ({
  type,
  name,
  label,
  span,
  is,
  placeholder,
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col justify-center w-full xl:w-5/6 gap-2">
      <label
        htmlFor={name}
        className="text-lg md:text-2xl text-white font-medium">
        {label}
      </label>
      <input
        type={showPassword ? "text" : type}
        name={name}
        id={name}
        className="bg-neutral-800 py-3 md:py-4 px-4 text-gray-200 rounded-md focus:outline-none text-lg md:text-xl"
        placeholder={placeholder}
        onChange={onChange} // Asignar la función de actualización al evento onChange
        value={value}
      />
      {type === "password" && (
        <div
          className={
            is === "SignIn"
              ? "xl:w-1/2 right-10 md:right-20 xl:right-24 flex mt-7 items-center absolute"
              : "xl:w-1/2 right-10 md:right-20 xl:right-24 flex mt-16 items-center absolute"
          }>
          <button
            type="button"
            className="text-2xl transform -translate-y-1/2 focus:outline-none text-blue-400"
            onClick={togglePasswordVisibility}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
      )}
      {span && (
        <span className="text-gray-300 flex items-end justify-end hover:underline underline-offset-4 xl:text-lg">
          {span}
        </span>
      )}
    </div>
  );
};
