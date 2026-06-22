import React from "react";

function Loading({ Title }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center py-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        <p className="mt-4 text-lg font-medium">{Title}...</p>
      </div>
    </div>
  );
}

export default Loading;
