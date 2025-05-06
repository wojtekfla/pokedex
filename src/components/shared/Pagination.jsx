import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

export function Pagination({ currentPage, totalPages, nextPage, prevPage }) {
  return (
    <div className="mb-1 mt-6 flex justify-center gap-4">
      <button
        className="flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 transition-colors hover:bg-blue-100 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:hover:bg-blue-900"
        onClick={() => {
          prevPage();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === 1}
      >
        <HiArrowLeft size={20} />
        <span>Previous</span>
      </button>
      <span className="my-auto text-lg font-bold text-gray-800 dark:text-gray-300">
        {currentPage} / {totalPages}
      </span>
      <button
        className="flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 transition-colors hover:bg-blue-100 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:hover:bg-blue-900"
        onClick={() => {
          nextPage();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === totalPages}
      >
        <HiArrowRight size={20} />
        <span>Previous</span>
      </button>
    </div>
  );
}
