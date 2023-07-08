import React, { useContext, useState } from "react";
import { NavMobile } from "../../Components/Layout/NavMobile/NavMobile";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AppName } from "../../Components/UI/AppName/AppName";
import { RiAlertFill } from "react-icons/ri";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import { ImSpinner6 } from "react-icons/im";
import { Header } from "../../Components/UI/Header/Header";
import { NavBar } from "../../Components/Layout/NavBar/NavBar";

export const NewPost = () => {
  const { user } = useContext(UserContext);

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const MAX_CHARACTERS = 255;

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const characterCount = content.length;
  const isApproachingLimit = characterCount >= MAX_CHARACTERS * 0.8;
  const isExceededLimit = characterCount >= MAX_CHARACTERS;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (content.trim() === "") {
      toast.error(
        "Por favor diligencia el contenido del Post antes de enviarlo!",
        {
          theme: "dark",
        }
      );
      return;
    }

    // Crear el objeto del nuevo post
    const newPost = {
      userId: user.nameid,
      content: content.trim(),
    };

    try {
      setIsLoading(true);
      // Realizar la petición POST al endpoint de creación de posts
      const response = await fetch("https://localhost:7060/api/Posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setIsLoading(false);
        // El post se creó exitosamente
        toast.success("Se creó el Post correctamente!", {
          theme: "dark",
        });
        setContent(""); // Limpiar el campo de contenido
      } else {
        // Hubo un error al crear el post
        setIsLoading(false);
        console.error("Error al crear el post");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error al crear el post", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-neutral-800 pb-10 lg:pb-0 h-full grid lg:grid-cols-3">
        <NavBar />
        <div className="container h-full mx-auto px-4  col-span-2">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl text-white">Nuevo Post</h1>
          </div>
          <div className="bg-neutral-950 rounded-lg py-4 px-4 w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 w-full">
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
                  {isLoading ? (
                    <ImSpinner6 className="text-2xl animate-spin" />
                  ) : (
                    "Publicar"
                  )}
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
