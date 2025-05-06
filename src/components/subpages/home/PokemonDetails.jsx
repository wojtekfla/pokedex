import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { PokeCardWrapper } from "../../shared/PokemonCardWrapper";

export function PokemonDetails({ pokemon, onModalClose }) {
  const { name, img, height, weight, base_exp, ability, isFavourite } = pokemon;
  const { darkMode } = useContext(ThemeContext);

  function capitalizeFirstLetter(string) {
    const newName = string.charAt(0).toUpperCase() + string.slice(1);
    return newName;
  }

  return (
    <div
      className={`h-[500px] w-4/5 max-w-5xl bg-${darkMode ? "gray-800" : "white"} flex rounded-2xl p-6 shadow-lg`}
    >
      <img className="w-1/3 object-contain" src={img} alt={name} />
      <div className="flex w-2/3 flex-col justify-center text-center">
        <p className="mb-4 text-2xl font-bold">{capitalizeFirstLetter(name)}</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <PokeCardWrapper attribute={height}>Height</PokeCardWrapper>
            <PokeCardWrapper attribute={weight}>Weight</PokeCardWrapper>
          </div>
          <div className="flex flex-col items-center">
            <PokeCardWrapper attribute={base_exp}>
              Base experience
            </PokeCardWrapper>
            <PokeCardWrapper attribute={ability}>Ability</PokeCardWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
