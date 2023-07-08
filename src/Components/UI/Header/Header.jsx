import React from "react";
import { AppName } from "../AppName/AppName";
import { IoMdNotificationsOutline } from "react-icons/io";

export const Header = () => {
  return (
    <header className="w-full bg-neutral-900 py-3 lg:hidden">
      <nav className="flex justify-between px-4 items-center">
        <AppName />
        <ul className="flex justify-end">
          <li className="text-4xl text-gray-300">
            <IoMdNotificationsOutline />
          </li>
        </ul>
      </nav>
    </header>
  );
};
