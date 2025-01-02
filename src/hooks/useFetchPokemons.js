import { useState, useEffect } from "react";

export function useFetchPokemons(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  function filterPokemonsData(pokemonsArray) {
    let array = [];
    pokemonsArray.map(
      ({
        id,
        name,
        height,
        weight,
        base_experience,
        abilities: ability,
        sprites,
      }) =>
        array.push({
          id: id,
          name: name,
          height: height,
          weight: weight,
          base_exp: base_experience,
          img: sprites.other.dream_world.front_default,
          ability: ability[0].ability.name,
          isFavourite: false
        }),
    );
    // console.log("array", array);
    setData(array);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("failed to get response");
        }
        const data = await response.json();
        if (data.results) {
          const secondResponse = await data.results.map(async (el) => {
            const res = await fetch(el.url);
            return await res.json();
          });
          const data2 = await Promise.all(secondResponse);
          filterPokemonsData(data2);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);       
      }
    };

    fetchData();

    return () => {
      setIsLoading(false);
    };
  }, [url]);

  return { data, error, isLoading };
}
