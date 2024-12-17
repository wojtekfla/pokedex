import { useState } from "react";
import { Card } from "./Card";

export function List({ data }) {
	const [pokemons, setPokemons] = useState([]);

	function handlePokemonsData(data) {}

	// console.log("List", data);
	// data.forEach((pokemon) => {
	// 	const pokeUrl = pokemon.url;
	// 	console.log("pokeUrl", pokeUrl);
	// 	fetch(pokeUrl)
	// 		.then((res) => res.json())
	// 		.then((res) => console.log(res))
	// 		.then((res) => {
	// 			setPokemons((prevData) => [...prevData, res]);
	// 		});
	// });

	return (
		<ul>
			<h2>Pokemony ...</h2>
			{/* {data.results.map((result, index) => (

        <Card props={result.url} key={index} />
      ))
    } */}
		</ul>
	);
}
