import React, { useContext, useState, useEffect } from "react";
import { Post } from "../../UI/Post/Post";
import { UserContext } from "../../../Context/UserContext";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  AiOutlineBulb,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";

export const Posts = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Realizar la petición GET para obtener los posts
        const postsResponse = await fetch("https://localhost:7060/api/Posts");
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();

          // Obtener los userIds de los posts
          const userIds = postsData.map((post) => post.userId);

          // Realizar una petición GET para obtener la información de cada usuario
          const usersPromises = userIds.map(async (userId) => {
            const userResponse = await fetch(
              `https://localhost:7060/api/User/${userId}`
            );
            if (userResponse.ok) {
              return userResponse.json();
            } else {
              console.error(
                `Error al obtener la información del usuario con userId ${userId}`
              );
              return null;
            }
          });

          // Esperar todas las solicitudes de usuario y obtener los resultados
          const usersData = await Promise.all(usersPromises);

          // Combinar la información del usuario con la información de los posts
          const combinedData = postsData.map((post, index) => {
            return {
              ...post,
              user: usersData[index], // Asignar la información del usuario al campo user
            };
          });

          // Actualizar el estado con los datos combinados
          setPosts(combinedData);
        } else {
          console.error("Error al obtener los posts");
        }
      } catch (error) {
        console.error("Error al obtener los posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 px-4 w-full place-content-center place-items-center py-10 gap-10">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.postId}
            name={post.user?.userName}
            content={post.content}
          />
        ))
      ) : (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
    </div>
  );
};

// Componente para el esqueleto de un post
const PostSkeleton = () => {
  return (
    <div className="bg-neutral-900 h-auto w-full flex flex-col gap-7 rounded-text-xs py-2">
      <div className="header flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 w-12 h-12 rounded-full animate-pulse"></div>
          <h2 className="text-xl text-gray-300 animate-pulse">
            <span className="inline-block bg-gray-300 h-6 w-32 rounded-full"></span>
          </h2>
        </div>
        <ul className="flex justify-end text-4xl text-blue-900">
          <li className="flex animate-pulse">
            <span className="h-6 w-6 bg-gray-300 rounded-full"></span>
          </li>
        </ul>
      </div>
      <div className="post w-full flex px-4">
        <p className="text-xl text-slate-100 animate-pulse">
          <span className="inline-block bg-gray-300 h-6 w-48 rounded"></span>
          <br />
          <span className="inline-block bg-gray-300 h-6 w-56 rounded"></span>
          <br />
          <span className="inline-block bg-gray-300 h-6 w-40 rounded"></span>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center text-4xl text-gray-300 gap-2 relative">
        <div className="reactions flex justify-start text-left w-full px-4">
          <p className="text-sm flex gap-2 text-neutral-300">
            <span className="font-bold animate-pulse">
              <span className="inline-block bg-gray-300 h-6 w-16 rounded"></span>
            </span>
          </p>
        </div>
        <span className="h-0.5 bg-black w-full"></span>
        <div className="flex gap-10">
          <div className="relative">
            <span className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></span>
          </div>
          <span className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></span>
          <span className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></span>
          <span className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};
