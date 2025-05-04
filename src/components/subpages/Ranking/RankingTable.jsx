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

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-[90vw] mx-auto table-auto border border-gray-300 dark:border-gray-600 text-sm md:text-base">
        <thead className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-300">
          <tr className="text-center">
            <th className='py-3 px-2 cursor-pointer' onClick={() => changeSortKey("name")}>
              poke name {getArrow("name")}
            </th>
            <th className='py-3 px-2'>Image</th>
            <th className='py-3 px-2 cursor-pointer' onClick={() => changeSortKey("base_exp")}>
              experience {getArrow("base_exp")}
            </th>
            <th className='py-3 px-2 cursor-pointer' onClick={() => changeSortKey("height")}>
              height {getArrow("height")}
            </th>
            <th className='py-3 px-2 cursor-pointer' onClick={() => changeSortKey("weight")}>
              weight {getArrow("weight")}
            </th>
            <th className='py-3 px-2 cursor-pointer' onClick={() => changeSortKey("win")}>win {getArrow("win")}</th>
            <th className='py-3 px-2 cursor-pointer' onClick={() => changeSortKey("loss")}>
              loss {getArrow("loss")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={item.id}
              className={`text-center ${index % 2 === 0 ? 'bg-gray-300 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <td className='py-2 px-2 font-semibold'>{item.name}</td>
              <td className='py-2 px-2 flex justify-center'>
                <img src={item.img} alt={item.name} className="h-12 w-12 object-contain" />
              </td>
              <td className='py-2 px-2'>{item.base_exp}</td>
              <td className='py-2 px-2'>{item.height}</td>
              <td className='py-2 px-2'>{item.weight}</td>
              <td className='py-2 px-2 text-blue-600 dark:text-blue-400'>{item.win ?? 0}</td>
              <td className='py-2 px-2 text-blue-600 dark:text-blue-400'>{item.loss ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
