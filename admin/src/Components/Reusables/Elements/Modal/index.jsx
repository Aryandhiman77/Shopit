import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoIosClose } from "react-icons/io";

const Modal = ({
  open = false,
  setOpen,
  children,
  title,
  className = "",
  fullScreen = true,
}) => {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow || "auto";
    };
  }, [open]); 

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-100 bg-white ${
        fullScreen ? "h-screen w-screen" : ""
      } ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-400">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <button onClick={() => setOpen(false)} className="p-2">
          <IoIosClose size={30} />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-64px)]">{children}</div>
    </div>,
    document.getElementById("modal"),
  );
};

export default Modal;
