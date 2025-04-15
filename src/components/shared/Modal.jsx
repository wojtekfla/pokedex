import { useEffect } from "react";

export function Modal({ children, onClose }) {
  console.log("on close modal", onClose);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* <div
        className="relative w-4/5 h-2/3 bg-white p-5 shadow-lg dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      > */}
        {children}
      </div>
    // </div>
  );
}
