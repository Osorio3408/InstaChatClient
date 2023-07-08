import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineBulb,
  AiOutlineComment,
  AiOutlineFire,
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegLaughSquint, FaRegSurprise } from "react-icons/fa";

const ReactionModal = ({ onClose, onSelectReaction }) => {
  const reactions = [
    {
      icon: <AiOutlineLike size={28} />,
      label: "Me gusta",
      color: "text-blue-700",
      hover: "hover:text-blue-700",
    },
    {
      icon: <AiOutlineHeart size={28} />,
      label: "Me encanta",
      color: "text-red-600",
      hover: "hover:text-red-600",
    },
    {
      icon: <FaRegLaughSquint size={28} />,
      label: "Me divierte",
      color: "text-yellow-600",
      hover: "hover:text-yellow-600",
    },
    {
      icon: <FaRegSurprise size={28} />,
      label: "Me asombra",
      color: "text-yellow-800",
      hover: "hover:text-yellow-800",
    },
    {
      icon: <AiOutlineFire size={28} />,
      label: "Me enoja",
      color: "text-rose-800",
      hover: "hover:text-rose-800",
    },
  ];

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute -top-20 -left-32 text-ye bg-neutral-950 text-gray-300 rounded-lg p-2 flex gap-3">
      {reactions.map((reaction, index) => (
        <div
          className={`flex flex-col w-20 items-center justify-center ${reaction.hover}`}>
          <button
            key={index}
            className={`flex flex-col items-center justify-center gap-2 w-12 focus:outline-none ${reaction.hover}`}
            onClick={() => {
              onSelectReaction(reaction);
              onClose();
            }}>
            {reaction.icon}
          </button>
          <span className={`text-xs `}>{reaction.label}</span>
        </div>
      ))}
    </div>
  );
};

export const Post = ({ name, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleToggleModalReaction = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectReaction = (reaction) => {
    if (selectedReaction === reaction) {
      setSelectedReaction(null);
    } else {
      setSelectedReaction(reaction);
    }
  };

  return (
    <div className="bg-neutral-900 h-auto w-full flex flex-col gap-7 rounded-text-xs py-2">
      <div className="header flex items-center justify-between w-full px-6">
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 w-12 h-12 rounded-full"></div>
          <h2 className="text-xl text-gray-300">{name}</h2>
        </div>
        <ul className="flex justify-end text-4xl text-blue-900">
          <li className="flex">
            <FiMoreHorizontal />
          </li>
        </ul>
      </div>
      <div className="post w-full flex px-6">
        <p className="text-xl text-slate-100">{content}</p>
      </div>

      <div className="flex flex-col items-center justify-center text-4xl text-gray-300 gap-2 relative">
        <div className="reactions flex justify-start text-left w-full px-6">
          <p className="text-sm flex gap-2 text-neutral-300">
            Reacciones: <span className="font-bold">10</span>
          </p>
        </div>
        <span className="h-0.5 bg-black w-full"></span>
        <div className="flex gap-10">
          <div className="relative">
            {selectedReaction ? (
              <div
                className={`${selectedReaction.color} cursor-pointer `}
                onClick={() => handleSelectReaction(selectedReaction)}>
                {selectedReaction.icon}
              </div>
            ) : (
              <AiOutlineBulb
                onClick={handleToggleModalReaction}
                className={`cursor-pointer ${
                  isOpen ? "text-yellow-500" : ""
                } transition-colors duration-300`}
              />
            )}
            {isOpen && (
              <ReactionModal
                onClose={handleToggleModalReaction}
                onSelectReaction={handleSelectReaction}
              />
            )}
          </div>
          <AiOutlineComment />
          <AiOutlineShareAlt />
        </div>
      </div>
    </div>
  );
};
