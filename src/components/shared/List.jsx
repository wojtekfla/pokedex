// import { useState, useEffect } from "react";
// import { Card } from "./Card";
// import { Button } from "./Button";

// export function List() {
// 	const [data, setData] = useState([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [pokeData, setPokeData] = useState([]);
// 	// fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
// 	// fetch("https://pokeapi.co/api/v2/pokemon/1")

// 	const BASE_URL = "https://pokeapi.co/api/v2";

// 	useEffect(() => {
// 		fetch(`${BASE_URL}/pokemon?limit=15`)
// 			.then((res) => res.json())
// 			.then((data) => {
// 				data.results.forEach((pokemon) => {
// 					fetchPokemonsDetails(pokemon);
// 				});
// 			})
// 			.finally(() => {
// 				setIsLoading(false);
// 			});
// 		return setPokeData ([])

// 	}, []);

// 	function filterPokemonsData(pokemonsArray) {
// 		let array = []
// 		pokemonsArray.map(( { id, name, height, weight, base_experience, abilities: ability, sprites} ) => 
// 			array.push( {
// 				id: id,
// 				name: name,
// 				height: height,
// 				weight: weight,
// 				base_exp: base_experience,
// 				img: sprites.other.dream_world.front_default,
// 				ability: ability[0].ability.name
// 			})
// 		)
// 		console.log('array', array)
// 		setPokeData(array)
// 		console.log("POKE DATA", pokeData)

// 	}

// 	function fetchPokemonsDetails(pokemons) {
// 		let url = pokemons.url;
// 		fetch(url)
// 			.then((res) => res.json())
// 			.then((pokeData) => {
// 				setData((prev) => [...prev, pokeData]);
// 			});
// 	}

// 	if (isLoading) {
// 		return <p>Fetching data, please wait ...</p>;
// 	}

// 	function handlePostData() {
// 		console.log("Clicked");
// 		fetch("http://localhost:3000/pokemons", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(data),
// 		});
// 	}

// 	function saveFilteredPokemons() {
// 		console.log("Clicked");
// 		fetch("http://localhost:3000/pokemons", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(pokeData),
// 		});
// 	}

// 	console.log("data", data);

// 	return (
// 		<>
// 			<ul>
// 				<h2 className="text-xl font-bold">Pokemony:</h2>
// 				{data &&
// 					data.map((pokemon, index) => <li key={index}>{pokemon.name}</li>)}

// 				{/* {data.results.map((result, index) => (
//         <Card props={result.url} key={index} />
//       ))
//     } */}
// 			</ul>
// 			<Button onClick={handlePostData} className="bg-teal-500 text-white p-2">
// 				Zapisz pokemony
// 			</Button>
// 			<div>
// 				<Button
// 					onClick={() => filterPokemonsData(data)}
// 					className="bg-teal-500 text-white p-2">
// 					Filtruj pokemony
// 				</Button>
// 			</div>
// 			<div>
// 				<Button
// 					onClick={saveFilteredPokemons}
// 					className="bg-teal-500 text-white p-2">
// 					Zapisz przefiltrowane
// 				</Button>
// 			</div>
// 		</>
// 	);
// }



// // pokemonsArray.map(( { id, name, height, weight, base_experience, abilities: ability, sprites :{front_default}  } ) => 
// // 	array.push( {
// // 		id: id,
// // 		name: name,
// // 		height: height,
// // 		weight: weight,
// // 		base_exp: base_experience,
// // 		img: front_default,
// // 		ability: ability[0].ability.name
// // 	})
// // )



