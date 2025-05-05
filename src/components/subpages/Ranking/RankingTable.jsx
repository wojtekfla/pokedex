import { useState } from "react";

export function RankingTable({ data }) {
  const [sort, setSort] = useState({ key: "name", orderBy: "asc" });

  const changeSortKey = (key) => {
    if (key === sort.key) {
      setSort({ key: key, orderBy: sort.orderBy === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key: key, orderBy: "asc" });
    }
    // console.log("key", key);
  };

  const getArrow = (key) => {
    if (sort.key !== key) return null;
    return sort.orderBy === "asc" ? "↑" : "↓";
  };

  const sortedData = [...data]
    // .filter((p)=> typeof p.win === 'number' || typeof p.loss === 'number') // opcjonalny filtr, nie wiem czy dodać
    .sort((a, b) => {
      const value1 = a[sort.key] ?? 0;
      const value2 = b[sort.key] ?? 0;

      if (typeof value1 === "number" && typeof value2 === "number") {
        return sort.orderBy === "asc" ? value1 - value2 : value2 - value1;
      } else {
        return sort.orderBy === "asc"
          ? String(value1).localeCompare(String(value2))
          : String(value2).localeCompare(String(value1));
      }
    });

  const thClasses =
    "py-2 px-1 cursor-pointer hover:rounded-md hover:outline hover:outline-2 hover:outline-offset-[-2px]";

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="mx-auto w-[90vw] table-auto border border-gray-300 text-sm dark:border-gray-600 md:text-base">
        <thead className="bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-300">
          <tr className="text-center">
            <th className="px-1 py-2 min-w-[100px]">Image</th>
            <th className={thClasses} onClick={() => changeSortKey("name")}>
              Name <span className="inline-block w-4">{getArrow("name")}</span>
            </th>
            <th className={thClasses} onClick={() => changeSortKey("base_exp")}>
              EXP.{" "}
              <span className="inline-block w-4">{getArrow("base_exp")}</span>
            </th>
            <th className={thClasses} onClick={() => changeSortKey("height")}>
              Height <span className="inline-block w-4">{getArrow("height")}</span>
            </th>
            <th className={thClasses} onClick={() => changeSortKey("weight")}>
              Weight <span className="inline-block w-4">{getArrow("weight")}</span>
            </th>
            <th className={thClasses} onClick={() => changeSortKey("win")}>
              Win <span className="inline-block w-4">{getArrow("win")}</span>
            </th>
            <th className={thClasses} onClick={() => changeSortKey("loss")}>
              Loss <span className="inline-block w-4">{getArrow("loss")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={item.id}
              className={`text-center ${index % 2 === 0 ? "bg-gray-300 dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}`}
            >
              <td className="flex justify-center px-2 py-2">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-12 w-12 object-contain"
                />
              </td>
              <td className="px-2 py-2 font-semibold">{item.name}</td>
              <td className="px-2 py-2">{item.base_exp}</td>
              <td className="px-2 py-2">{item.height}</td>
              <td className="px-2 py-2">{item.weight}</td>
              <td className="px-2 py-2 text-blue-600 dark:text-blue-400">
                {item.win ?? 0}
              </td>
              <td className="px-2 py-2 text-blue-600 dark:text-blue-400">
                {item.loss ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
