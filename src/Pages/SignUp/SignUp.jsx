import React, { useState } from "react";
import { FormUrl } from "../../Components/UI/FormUrl/FormUrl";
import { FormBtn } from "../../Components/UI/FormBtn/FormBtn";
import { FormInput } from "../../Components/Layout/FormInput/FormInput";
import { AppName } from "../../Components/UI/AppName/AppName";
import { FormOpinions } from "../../Components/Layout/FormOpinions/FormOpinions";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNombreChange = (event) => {
    setName(event.target.value);
  };

  const handleCorreoChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmarContrasenaChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const validateEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      toast.error("Por favor, ingresa un correo electrónico válido.", {
        theme: "dark",
      });
      return;
    }

    if (name.trim() === "") {
      toast.error("Por favor, ingresa tu nombre completo.", {
        theme: "dark",
      });
      return;
    }

    if (email.trim() === "") {
      toast.error("Por favor, ingresa tu correo electrónico.", {
        theme: "dark",
      });
      return;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.", {
        theme: "dark",
      });
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Las contraseñas no coinciden.", {
        theme: "dark",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Por favor, ingresa un correo electrónico válido.", {
        theme: "dark",
      });
      return;
    }

    setIsLoading(true);

    fetch(`https://instachat.azurewebsites.net/api/User/addUser`, {
      method: "POST",
      body: JSON.stringify({
        userName: name,
        userEmail: email,
        userPassword: password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data === "Usuario creado exitosamente!") {
          setEmail("");
          setName("");
          setPassword("");
          setPasswordConfirm("");
          toast.success(data, {
            theme: "dark",
          });
          toast.info(
            "Por favor, verifica tu cuenta a través del correo electrónico que ingresaste. Se ha enviado un mensaje de verificación.",
            {
              theme: "dark",
              position: "top-left",
            }
          );
        } else {
          toast.error(data.UserEmail[0], {
            theme: "dark",
          });
        }
      });
  };

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
              onChange={handleNombreChange}
              value={name}
              name={"userName"}
            />

            <FormInput
              type="email"
              label="Correo electrónico"
              placeholder="correo123@gmail.com"
              onChange={handleCorreoChange}
              value={email}
              name={"userEmail"}
            />

            <FormInput
              type="password"
              label="Contraseña:"
              placeholder="******"
              onChange={handleContrasenaChange}
              value={password}
              name={"userPassword"}
              is={"SignUp"}
            />

            <FormInput
              type="password"
              label="Confirmar contraseña:"
              placeholder="******"
              onChange={handleConfirmarContrasenaChange}
              value={passwordConfirm}
              name={"userPasswordConfirm"}
              is={"SignUp"}
            />
            <FormBtn
              isLoading={isLoading}
              btn={"Registrarse"}
              onClick={handleSubmit}
            />
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
