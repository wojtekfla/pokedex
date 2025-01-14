export function RankingTable({ data, sortMethod }) {
  return (
    <table className="">
      <thead>
        <tr>
          <th>
            <p>poke id</p>
          </th>
          <th>
            <p>poke name</p>
          </th>
          <th>
            <p>poke img</p>
          </th>
          <th>
            <p>poke height</p>
          </th>
          <th>
            <p>poke weight</p>
          </th>
          <th>
            <p>poke win</p>
          </th>
          <th>
            <p>base loss</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>IMG</td>
          <td>base exp</td>
          <td>height</td>
          <td>weight</td>
          <td>win</td>
          <td>loss</td>

        </tr>

      </tbody>
    </table>
  );
}
