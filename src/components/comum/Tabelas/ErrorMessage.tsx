import React from "react";
import { BiError } from "react-icons/bi";

function ErrorMessage({ message }: any) {
  return (
    <div className="text-sm text-red-900 bg-red-100 p-4 m-4 border border-dashed border-red-500 rounded-lg">
      <p className="flex items-center gap-2">
        <BiError size={30} /> {message}
      </p>
    </div>
  );
}

export default ErrorMessage;
