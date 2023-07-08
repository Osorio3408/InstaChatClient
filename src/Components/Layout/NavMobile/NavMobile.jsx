import React from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlinePlusSquare,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export const NavMobile = ({ home, newPost }) => {
  return (
    <div className="bg-neutral-900 h-14 bottom-0 w-full fixed flex text-5xl text-gray-300 justify-around items-center lg:hidden ">
      <Link to={"/"}>
        <AiOutlineHome
          className={`${
            home ? "bg-neutral-700" : "hover:bg-neutral-700"
          } rounded-lg p-2`}
        />
      </Link>
      <Link>
        <AiOutlineSearch className="hover:bg-neutral-700 rounded-lg p-2" />
      </Link>
      <Link to={"/NewPost"}>
        <AiOutlinePlusSquare
          className={`${
            newPost ? "bg-neutral-700" : "hover:bg-neutral-700 "
          } rounded-lg p-2`}
        />
      </Link>
      <Link>
        <AiOutlineMessage className="hover:bg-neutral-700 rounded-lg p-2" />
      </Link>
      <Link>
        <AiOutlineUser className="hover:bg-neutral-700 rounded-lg p-2" />
      </Link>
    </div>
  );
};
