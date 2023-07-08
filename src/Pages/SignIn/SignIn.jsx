import React, { useContext, useState } from "react";
import { FormInput } from "../../Components/Layout/FormInput/FormInput";
import { FormBtn } from "../../Components/UI/FormBtn/FormBtn";
import { FcGoogle } from "react-icons/fc";
import { FormUrl } from "../../Components/UI/FormUrl/FormUrl";
import { AppName } from "../../Components/UI/AppName/AppName";
import { FormOpinions } from "../../Components/Layout/FormOpinions/FormOpinions";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      toast.error(
        "Por favor ingrese todos los datos para poder iniciar sesión",
        {
          theme: "dark",
        }
      );
      return;
    }

    setIsLoading(true);
    fetch(`https://instachat.azurewebsites.net/api/Auth/SignIn`, {
      method: "POST",
      body: JSON.stringify({
        userEmail: email,
        userPassword: password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            toast.error(data.UserError[0], {
              theme: "dark",
            });
            return Promise.reject(data);
          });
        }
      })
      .then((data) => {
        setIsLoading(false);
        // Manejar la respuesta exitosa (token)
        Cookies.set("token", data.value.token, { expires: 1 });
        toast.success("!Bienvenido!", {
          theme: "dark",
        });
        handleLogin(data.value.token); // Actualizar el estado user con la información del usuario actual

        // console.log(data.value.token);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        // Manejar errores de red u otros errores
        console.error(error);
        // toast.error(error.message || "Error al iniciar sesión", {
        //   theme: "dark",
        // });
      });
  };

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
              onChange={handleEmailChange}
              value={email}
              name={"userEmail"}
            />
            <FormInput
              type="password"
              label=" Contraseña:"
              span="¿Se te olvidó la contraseña?"
              placeholder={"*****"}
              onChange={handlePasswordChange}
              value={password}
              name={"userPassword"}
              is={"SignIn"}
            />
            <FormBtn
              btn={"Iniciar sesión"}
              onClick={handleSubmit}
              isLoading={isLoading}
            />
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
