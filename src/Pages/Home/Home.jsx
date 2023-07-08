import React, { useContext, useEffect } from "react";
import { NavMobile } from "../../Components/Layout/NavMobile/NavMobile";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Posts } from "../../Components/Layout/Posts/Posts";
import { AppName } from "../../Components/UI/AppName/AppName";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Header } from "../../Components/UI/Header/Header";
import {
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlinePlusSquare,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { NavBar } from "../../Components/Layout/NavBar/NavBar";

export const Home = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/SignIn");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="bg-neutral-800 pb-10 lg:pb-0 grid lg:grid-cols-3 w-full">
        <NavBar />
        <Posts />

        <div className="ml-40 derecho border-l bg-neutral-600"></div>
      </div>
      <NavMobile home={true} />
    </>
  );
};
