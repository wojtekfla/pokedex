import { useContext, useState } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { LuSwords } from "react-icons/lu";
import { JSON_SERVER_URL } from "../../../utils/constants";
import { ArenaSlot } from "./ArenaSlot";

export function Arena() {
  const { pokemonsData, setPokemonsData } = useContext(PokeDataContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const pokemonsInArena = pokemonsData.filter((p) => p.isInArena);

  const handleFightClick = async () => {
    if (pokemonsInArena.length < 2) {
      enqueueSnackbar("Select two Pokemons first", { variant: "info" });
      return;
    }

    const [p1, p2] = pokemonsInArena;
    const power1 = p1.base_exp * p1.weight;
    const power2 = p2.base_exp * p2.weight;

    let winnerId = null;
    let loserId = null;

    if (power1 === power2) {
      enqueueSnackbar("It's a draw! No one losses", { variant: "info" });
      // tu dodać czyszczenie isInArena
      setTimeout(() => navigate("/"), 2000);
      return;
    } else if (power1 > power2) {
      winnerId = p1.id;
      loserId = p2.id;
    } else {
      winnerId = p2.id;
      loserId = p1.id;
    }

    const updatedArena = pokemonsInArena.map((p) => {
      const isWinner = p.id === winnerId;
      const isLoser = p.id === loserId;
      return {
        ...p,
        isInArena: false,
        edited: true,
        win: p.win + (isWinner ? 1 : 0),
        loss: p.loss + (isLoser ? 1 : 0),
        base_exp: p.base_exp + (isWinner ? 10 : 0),
      };
    });

    try {
      await Promise.all(
        updatedArena.map(async (p) => {
          const getRes = await fetch(`${JSON_SERVER_URL}/${p.id}`);
          if (getRes.ok) {
            await fetch(`${JSON_SERVER_URL}/${p.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(p),
            });
          } else if (getRes.status === 404) {
            await fetch(`${JSON_SERVER_URL}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(p),
            });
          }
        }),
      );

      setPokemonsData((prev) =>
        prev.map((orginalPokemon) => {
          const afterBattlePokemon = updatedArena.find(
            (p) => p.id === orginalPokemon.id,
          );
          return afterBattlePokemon ? afterBattlePokemon : orginalPokemon;
        }),
      );

      setResult({ winnerId, loserId });
      enqueueSnackbar("Battle finished!", { variant: "success" });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Error saving battle result: ", err);
      enqueueSnackbar("Error updating server data", { variant: "error" });
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-center text-2xl font-bold dark:text-slate-300">
        Arena Battle
      </h1>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
        <ArenaSlot
          pokemon={pokemonsInArena[0]}
          label={pokemonsInArena[0]?.name}
          status={
            result?.winnerId === pokemonsInArena[0]?.id
              ? "winner"
              : result?.loserId === pokemonsInArena[0]?.id
                ? "loser"
                : undefined
          }
        />

        <div className="flex justify-center">
          <button
            onClick={handleFightClick}
            disabled={pokemonsInArena.length < 2}
            className="rounded-full bg-red-500 p-4 text-slate-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <LuSwords size={32} />
          </button>
        </div>

        <ArenaSlot
          pokemon={pokemonsInArena[1]}
          label={pokemonsInArena[1]?.name}
          status={
            result?.winnerId === pokemonsInArena[1]?.id
              ? "winner"
              : result?.loserId === pokemonsInArena[1]?.id
                ? "loser"
                : undefined
          }
        />
      </div>
    </div>
  );
}
