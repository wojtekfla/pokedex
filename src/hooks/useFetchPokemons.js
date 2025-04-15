import { useState, useEffect } from "react";

import { API_URL, JSON_SERVER_URL } from "../utils/constants";

export function useFetchPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      setIsLoading(true);
      try {
        const apiResponse = await fetch(API_URL);
        const apiData = await apiResponse.json();
        const pokemonList = apiData.results;

        const detailedPokemons = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();

            return {
              id: data.id,
              name: data.name,
              height: data.height,
              weight: data.weight,
              base_exp: data.base_experience,
              img: data.sprites.other.dream_world.front_default,
              ability: data.abilities[0]?.ability.name || 'unknown',
              isFavourite: data.isFavourite || false,
              isInArena: data.isInArena || false,
              win: data.win || 0,
              loss: data.win || 0,
              edited: data.edited || false
            };
          }),
        );

        // ... dodaje funkcjonalność zależną od zalogowania, stąd zakomentowany kod ...
        // console.log('Pokemony z API:', detailedPokemons)

        // const jsonResponse = await fetch(JSON_SERVER_URL);
        // const jsonPokemons = await jsonResponse.json();
        // console.log("Pokemony z JSON Servera", jsonPokemons);

        // const mergedPokemons = detailedPokemons.map((pokemon) => {
        //   const foundPokemon = jsonPokemons.find((p) => p.id === pokemon.id);
        //   return foundPokemon ? { ...pokemon, ...foundPokemon } : pokemon;
        // });
        // console.log("Merged Pokemons:", mergedPokemons);

        // const newPokemons = jsonPokemons.filter(
        //   (p) => !detailedPokemons.some((apiP) => apiP.id === p.id)
        // )

        // const finalPokemons = [...mergedPokemons, ...newPokemons]
        // console.log('Finalna lista pokemonów', finalPokemons)

        // setPokemons(finalPokemons)
        setPokemons(detailedPokemons)

      } catch (err) {
        console.log('err in useFetch', err)
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  return { pokemons, setPokemons, error, isLoading };
}

