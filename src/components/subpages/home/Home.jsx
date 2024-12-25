import { useState, useEffect } from "react";
import { Card } from "../../shared/Card";
import { List } from "../../shared/List";
import { SearchPokemons } from "./SearchPokemons";
import { PokemonsList } from "./PokemonsList";

export function Home() {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	
	return (
		<>
			<SearchPokemons />
			<PokemonsList />
			{/* <List /> */}

			{/* <img className="w-52 h-52" src={data.sprites.front_default}></img> */}
		</>

		// <div>{data.map((pokemon) => (
		//   <>
		//   <div>{pokemon.name}</div>
		//   {/* <div>{pokemon.image}</div> */}
		//   </>
		// ))}</div>
	);
}

{
	/* <img className="" src={data.sprites?.other["official-artwork"].front_dafault}></img> */
}
