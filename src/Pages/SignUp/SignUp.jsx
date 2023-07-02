import React from "react";
import { FormUrl } from "../../Components/UI/FormUrl/FormUrl";
import { FormBtn } from "../../Components/UI/FormBtn/FormBtn";
import { FormInput } from "../../Components/Layout/FormInput/FormInput";
import { AppName } from "../../Components/UI/AppName/AppName";
import { FormOpinions } from "../../Components/Layout/FormOpinions/FormOpinions";

export const SignUp = () => {
  return (
    <div className="h-fit w-screen bg-neutral-900 p-4 md:p-12 lg:p-10 xl:p-0 flex flex-col gap-14">
      <AppName />
      <div className="flex w-full justify-around">
        <div className="flex flex-col items-center justify-center w-full gap-16 xl:w-1/2 xl:border xl:border-blue-900 xl:p-8 xl:rounded-md">
          <h2 className="text-white font-semibold text-2xl md:text-3xl">
            Crear una cuenta
          </h2>
          <div className="w-full flex flex-col justify-center items-center gap-10">
            <FormInput
              type="text"
              label="Nombre completo:"
              placeholder={"Yuliam Andrey Osorio Puerta"}
            />
            <FormInput
              type="email"
              label="Correo electrónico"
              placeholder="correo123@gmail.com"
            />
            <FormInput
              type="password"
              label="Contraseña:"
              placeholder="******"
            />
            <FormInput
              type="password"
              label="Confirmar contraseña:"
              placeholder="******"
            />
            <FormBtn btn={"Registrarse"} />
          </div>
          <FormUrl
            text="¿Ya tienes una cuenta?"
            link="Inicia sesión aquí"
            to="/SignIn"
          />
        </div>
        <FormOpinions />
      </div>
    </div>
  );
};
