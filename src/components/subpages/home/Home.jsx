import { useState, useEffect } from "react";
import { Card } from "../../shared/Card";
import { List } from "../../shared/List";
// fetch('https://pokeapi.co/api/v2/?limit=20/')

export function Home() {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		// fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
		// fetch("https://pokeapi.co/api/v2/pokemon/1")
		fetch("https://pokeapi.co/api/v2/pokemon?limit=5")
			.then((res) => res.json())
			.then((res) => {
				// console.log("response", res);
				setData(res.results);
			});
	}, []);

	console.log("data", data);

	if (data.length === 0) {
		return <p>Loading ...</p>
	}

	return (
		<>
			<p>{data.name}</p>
			<List data={data}/>
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
