import React from "react";
import { NavMobile } from "../../Components/Layout/NavMobile/NavMobile";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Posts } from "../../Components/Layout/Posts/Posts";
import { AppName } from "../../Components/UI/AppName/AppName";

export const Home = () => {
  return (
    <>
      <div className="bg-neutral-800 pb-10 lg:pb-0">
        <header className="w-full bg-neutral-900 py-3">
          <nav className="flex justify-between px-4 items-center">
            <AppName />
            <ul className="flex justify-end">
              <li className="text-4xl text-gray-300">
                <IoMdNotificationsOutline />
              </li>
            </ul>
          </nav>
        </header>
        <Posts />
      </div>
      <NavMobile home={true} />
    </>
  );
};
