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

  return (
    <table className="mt-6 w-full table-auto">
      <thead className="outline outline-2">
        <tr className="group/{tableHeader} cursor-pointer outline outline-1 ">
          <th className="">
            <p className="">ID</p>
          </th>
          <th >
            <p>poke img</p>
          </th>
          <th className="group">
            <p onClick={() => changeSortKey("name")}>poke name</p>
          </th>
          <th>
            <p>experience</p>
          </th>
          <th>
            <p>height</p>
          </th>
          <th>
            <p>weight</p>
          </th>
          <th>
            <p onClick={() => changeSortKey("win")}>win</p>
          </th>
          <th>
            <p onClick={() => changeSortKey("loss")}>loss</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {data
          .sort((a, b) => {
            const value1 = a[sort.key];
            const value2 = b[sort.key];
            if (typeof value1 === "number") {
              if (sort.orderBy === "asc") {
                return value2 - value1;
              }
              return value1 - value2;
            } else {
              if (sort.orderBy === "asc") {
                return value1.localeCompare(value2);
              }
              return value2.localeCompare(value1);
            }
          })
          .map((item) => {
            return (
              <tr key={item.id} className="group/{tableRow} text-center text-emerald-600 align-center">
                <td>{item.id}</td>
                <td className="flex justify-center p-1">
                  <img src={item.img} className="max-h-16" />
                </td>
                <td>{item.name}</td>
                <td>{item.base_exp}</td>
                <td>{item.height}</td>
                <td>{item.weight}</td>
                <td>{item.win}</td>
                <td>{item.loss}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
