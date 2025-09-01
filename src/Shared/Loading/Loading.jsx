import React from "react";
import { FiLoader } from "react-icons/fi";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <FiLoader className="h-10 w-10 text-light-accent animate-spin" />
        <p className="text-light-text font-secondary text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
