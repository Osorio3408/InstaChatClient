import React from "react";
import { FormInput } from "../../Components/Layout/FormInput/FormInput";
import { FormBtn } from "../../Components/UI/FormBtn/FormBtn";
import { FcGoogle } from "react-icons/fc";
import { FormUrl } from "../../Components/UI/FormUrl/FormUrl";
import { AppName } from "../../Components/UI/AppName/AppName";
import { FormOpinions } from "../../Components/Layout/FormOpinions/FormOpinions";

export const SignIn = () => {
  return (
    <div className="h-fit w-screen bg-neutral-900 p-4 md:p-20 lg:p-10 xl:px-20 flex flex-col gap-14">
      <AppName />
      <div className="flex w-full justify-around">
        <div className="flex flex-col items-center justify-center w-full gap-16 xl:w-1/2 xl:border xl:border-blue-950 xl:p-4 xl:rounded-md">
          <h2 className="text-white font-semibold text-2xl md:text-3xl">
            Iniciar sesión
          </h2>
          <div className="w-full flex flex-col justify-center items-center gap-10">
            <FormInput
              type="email"
              label="Correo electrónico"
              placeholder={"correo123@gmail.com"}
            />
            <FormInput
              type="password"
              label=" Contraseña:"
              span="¿Se te olvidó la contraseña?"
              placeholder={"*****"}
            />
            <FormBtn btn={"Iniciar sesión"} />
          </div>
          <div className="flex items-center gap-5">
            <span className="h-0.5 bg-black w-48"></span>
            <p className="text-white font-bold text-xl">O</p>
            <span className="h-0.5 bg-black w-48"></span>
          </div>
          <button className="w-80 bg-white py-2 xl:py-3 rounded-lg flex text-xl px-4 items-center justify-between hover:bg-gray-200">
            Iniciar sesión con Google
            <span>
              <FcGoogle className="text-3xl" />
            </span>
          </button>
          <FormUrl
            text="¿No tienes una cuenta?"
            link="Regístrate aquí"
            to="/SignUp"
          />
        </div>
        <FormOpinions />
      </div>
    </div>
  );
};