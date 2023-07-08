import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../Context/UserContext";

export const SignOff = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(UserContext);

  const handleSignOff = () => {
    toast.success("Sesión cerrada con éxito!", {
      theme: "dark",
    });
    handleLogout();
    navigate("/SignIn");
  };

  return (
    <li
      onClick={handleSignOff}
      className="hover:underline hover:cursor-pointer">
      Cerrar sesión
    </li>
  );
};
