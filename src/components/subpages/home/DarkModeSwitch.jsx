import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import { FaMoon, FaSun } from "react-icons/fa";
import clsx from "clsx";

export function DarkModeSwitch() {
  const { darkMode, toggleDarkMode, clearDarkMode } = useContext(ThemeContext);

  return (
    <div className="flex justify-end">
      
      <button
        onClick={toggleDarkMode}
        className={clsx(
          "relative inline-flex h-4 w-8 items-center rounded-full p-1 transition-colors duration-300 focus:outline-none",
          darkMode ? "bg-gray-700" : "bg-yellow-400",
        )}
      > 
        <span
          className={clsx(
            "flex h-3 w-3 transform items-center justify-center rounded-full bg-slate-200 shadow-md transition-transform duration-300",
            darkMode ? "translate-x-3" : "translate-x-0",
          )}
        ></span>
      </button>
      <span className="ml-2">{darkMode ? <FaMoon className="text-slate-500" /> : <FaSun className="text-yellow-300" />}</span>
    </div>
  );
}
