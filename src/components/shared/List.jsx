import { useState, useEffect } from "react";
import { Card } from "./Card";

export function List() {
	const [data, setData] = useState([]);
	// fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
	// fetch("https://pokeapi.co/api/v2/pokemon/1")

	const URL = "https://pokeapi.co/api/v2/";

	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
			.then((res) => res.json())
			.then(function (data) {
				console.log('data raw', data)
				data.results.forEach((pokemon) => {
					console.log(pokemon);
					fetchPokemonsDetails(pokemon);
					
				});
			});

		function fetchPokemonsDetails(pokemons) {
			let url = pokemons.url;
			fetch(url)
				.then((res) => res.json())
				.then(function (pokeData) {
					setData((prev) => [...prev, pokeData]);
				});
		}
	}, []);

	if (data.length === 0) {
		return <p>Loading ...</p>;
	}

	console.log('data', data)

	return (
		<ul>
			<h2>Pokemony ...</h2>
			{data && data.map((pokemon, index) => (
				<li key={index}>{pokemon.name}</li>
			))}

			{/* {data.results.map((result, index) => (

        <Card props={result.url} key={index} />
      ))
    } */}
		</ul>
	);
}
