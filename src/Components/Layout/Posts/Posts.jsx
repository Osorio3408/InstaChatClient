import React from "react";
import { Post } from "../../UI/Post/Post";

export const Posts = () => {
  return (
    <div className="grid grid-cols-1 px-4 place-content-center place-items-center py-10 gap-10">
      <Post />
      <Post />
      <Post />
    </div>
  );
};
