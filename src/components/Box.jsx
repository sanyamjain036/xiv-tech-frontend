import React from "react";

const Box = ({ text, id, handleRemoveLocation }) => {
  return (
    <div className="flex items-center">
      <span className="bg-gray-200 p-2">{text}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-10 bg-red-300 cursor-pointer"
        onClick={()=>handleRemoveLocation(id)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default Box;
