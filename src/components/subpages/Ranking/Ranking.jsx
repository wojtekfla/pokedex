import { Button } from "../../shared/Button";
import { RankingTable } from "./RankingTable";

export function Ranking() {
  const data = 'pokemonsArray'
  const sortMethod = 'sortMethod'

  

  return (
    <>
      <div>
        <div>
          <RankingTable data={data} sortMethod={sortMethod} />
        </div>
      </div>
    </>
  );
}
