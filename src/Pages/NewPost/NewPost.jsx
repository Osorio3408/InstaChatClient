import React, { useState } from "react";
import { NavMobile } from "../../Components/Layout/NavMobile/NavMobile";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AppName } from "../../Components/UI/AppName/AppName";
import { RiAlertFill } from "react-icons/ri";

export const NewPost = () => {
  const [content, setContent] = useState("");
  const MAX_CHARACTERS = 255;

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const characterCount = content.length;
  const isApproachingLimit = characterCount >= MAX_CHARACTERS * 0.8;
  const isExceededLimit = characterCount >= MAX_CHARACTERS;

  return (
    <>
      <div className="bg-neutral-800 pb-10 lg:pb-0 h-full">
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
        <div className="container h-full mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl text-white">Nuevo Post</h1>
          </div>
          <div className="bg-neutral-950 rounded-lg py-4 px-6">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-white text-lg font-medium mb-2">
                  Contenido
                </label>
                <textarea
                  id="content"
                  className={`w-full bg-transparent border-b border-white py-2 px-3 text-white placeholder-gray-400 focus:outline-none resize-none ${
                    isExceededLimit ? "border-red-500" : ""
                  }`}
                  rows="6"
                  maxLength={MAX_CHARACTERS}
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Ingrese el contenido del post"></textarea>
                {isApproachingLimit && !isExceededLimit && (
                  <div className="flex items-center mt-1">
                    <RiAlertFill className="text-yellow-500 mr-1" />
                    <p className="text-xs text-yellow-500">
                      Te estás acercando al límite de caracteres.
                    </p>
                  </div>
                )}
                {isExceededLimit && (
                  <div className="flex items-center mt-1">
                    <RiAlertFill className="text-red-500 mr-1" />
                    <p className="text-xs text-red-500">
                      Has excedido el límite de caracteres.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  disabled={isExceededLimit}
                  type="submit"
                  className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none disabled:bg-blue-950 font-bold`}>
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <NavMobile newPost={true} />
    </>
  );
};
