import React from "react";
import { AppName } from "../../UI/AppName/AppName";
import {
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlinePlusSquare,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const NavBar = () => {
  const navigate = useNavigate();
  const handeCloseSesion = () => {
    Cookies.remove("token");
    navigate("/SignIn");
  };

  return (
    <div className="hidden lg:block izquierdo border-r w-3/4">
      <div className="py-8">
        <AppName />
      </div>
      <div className="flex items-center w-full justify-center flex-col">
        <ul className="lg:text-3xl xl:text-4xl flex justify-center flex-col gap-10">
          <li className="flex gap-2 items-center text-gray-300 hover:bg-neutral-700 xl:pr-10 rounded-lg py-1 cursor-pointer pl-1">
            <Link
              to={"/"}
              className="flex gap-2 items-center text-gray-300 hover:bg-neutral-700 xl:pr-10 rounded-lg py-1 cursor-pointer pl-1">
              <AiOutlineHome />
              <p>Inicio</p>
            </Link>
          </li>
          <li className="flex gap-2 items-center text-gray-300 hover:bg-neutral-700 xl:pr-10 rounded-lg py-1 cursor-pointer pl-1">
            <AiOutlineSearch />
            <p>Buscar</p>
          </li>
          <li className="flex gap-2 items-center text-gray-300 hover:bg-neutral-700 xl:pr-10 rounded-lg py-1 cursor-pointer pl-1">
            <Link
              to={"/newPost"}
              className="flex gap-2 items-center text-gray-300 hover:bg-neutral-700 xl:pr-10 rounded-lg py-1 cursor-pointer pl-1">
              <AiOutlinePlusSquare />
              <p>Crear</p>
            </Link>
          </li>
          <li className="flex gap-2 items-center text-gray-300 hover:bg-neutral-700 xl:pr-10 rounded-lg py-1 cursor-pointer pl-1">
            <AiOutlineMessage />
            <p>Mensajes</p>
          </li>
          <li
            onClick={handeCloseSesion}
            className="flex gap-2 items-center text-gray-300 hover:bg-neutral-700 xl:pr-10 rounded-lg py-1 cursor-pointer pl-1">
            <AiOutlineUser />
            <p>Perfil</p>
          </li>
          <li className="flex gap-2 items-center text-gray-300 hover:bg-neutral-700 xl:pr-10 rounded-lg py-1 cursor-pointer pl-1">
            <AiOutlineBell />
            <p>Notificaciones</p>
          </li>
          <li className="flex gap-2 items-center text-gray-300 absolute bottom-24 hover:bg-neutral-700 pr-0 rounded-lg py-1 cursor-pointer pl-1 lg:w-56 xl:w-72">
            <AiOutlineMenu />
            <p>Más</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
