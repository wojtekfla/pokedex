import { useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";

import { FiSearch } from "react-icons/fi";

export function SearchPokemons() {
  const { searchName, setSearchName } = useContext(PokeDataContext);

  return (
    <div className="my-2 py-1 flex justify-center dark:bg-gradient-to-b dark:from-blue-500 dark:to-gray-700">
      <div className="relative w-[90%] max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />

        <input
          className="w-full rounded-md border border-gray-300 bg-slate-300 px-10 py-2 text-gray-900 placeholder-slate-500 shadow-sm transition focus:border-2 focus:border-gray-500 dark:border-gray600 dark:bg-gray-800 dark:text-slate-300 dark:placeholder-slate-400"
          type="text"
          placeholder="Search Pokemon by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchPokemons;
