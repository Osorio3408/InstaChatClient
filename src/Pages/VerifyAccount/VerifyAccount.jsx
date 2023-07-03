import React, { useEffect, useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const VerifyAccount = () => {
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Simulando una petición de verificación de cuenta
    // Aquí deberías realizar la petición real a tu backend para verificar la cuenta del usuario

    fetch(
      `https://instachat.azurewebsites.net/api/Auth/verifyEmail?userId=${userId}&token=${token}`
    )
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error al verificar el correo electrónico");
        }
      })
      .then((message) => {
        setIsLoading(false);
        setIsVerified(true);
        toast.success(message, {
          theme: "dark",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        // Manejar errores de red u otros errores
        console.error(error);
        toast.error("Error al verificar el correo electrónico", {
          theme: "dark",
        });
      });
  }, [userId, token]);

  useEffect(() => {
    if (isVerified) {
      // Redirigir al usuario a SignIn después de 3 segundos
      const timeoutId = setTimeout(() => {
        navigate("/SignIn");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isVerified, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-neutral-900">
        <div className="text-white text-3xl bg-neutral-800 w-1/2 text-center h-96 flex items-center justify-center rounded-lg shadow-md shadow-neutral-500 flex-col gap-10">
          Verificando cuenta...
          <span>
            <ImSpinner6 className="text-4xl animate-spin text-blue-400" />
          </span>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-neutral-900">
        <div className="text-white text-3xl bg-neutral-800 w-1/2 text-center h-96 flex items-center justify-center rounded-lg shadow-md shadow-neutral-500">
          ¡Cuenta verificada exitosamente!
        </div>
      </div>
    );
  }

  return null;
};
