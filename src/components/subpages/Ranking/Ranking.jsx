import { useContext } from "react";
import { Button } from "../../shared/Button";
import { RankingTable } from "./RankingTable";
import { PokeDataContext } from "../../../context/PokeDataContext";

export function Ranking() {
  const { pokemonsData } = useContext(PokeDataContext);

  return (
    <>
        <RankingTable data={pokemonsData} />
    </>
  );
}
