import { useContext, useState, useEffect } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { BASE_URL } from "../../../utils/constants";
import { removeFavourite } from "../../../utils/removeFavourite";
import { PokemonCard } from "../Home/PokemonCard";
import { LoginContext } from "../../../context/LoginContext";

export function Favourites() {
  const { isLoggedIn } = useContext(LoginContext);
  const { pokemonsData, toggleFavourite, toggleArena,
    handleFavouriteClick, } = useContext(PokeDataContext);

  const [favouritesPokemons, setFavouritesPokemons] = useState([]);

  useEffect(() => {
    setFavouritesPokemons(pokemonsData.filter((p) => p.isFavourite));
  }, [pokemonsData]);

  // const loadFavourites = async () => {
  //   try {
  //     const res = await fetch(FAV_URL)
  //     const json = await res.json()
  //     console.log("json", json)
  //     setFavouritesData(json)
  //     } catch (e) {
  //       console.error('Error', e)
  //   }
  // }

  // const addData = async (url, bodyData) => {
  //   try {
  //     const res = await fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(bodyData),
  //     headers: {
  //       "Content-Type": "application/json",
  //       },
  //     })
  //     if(res.ok) {
  //       await loadFavourites()
  //       console.log('fav json', favouritesData)
  //       console.log('pokemon dodany do favourites')
  //     }
  //   } catch (e) {
  //     console.error('Error', e)
  //   }
  // }

  function handleRemoveFromFavourite(pokemon) {
    console.log("fav poke delete handled", pokemon);
    removeFavourite(pokemon, BASE_URL, toggleFavourite);
  }

  // function handleDeleteFavourite(id) {
  //   fetch(`${FAV_URL}/${id}`, {
  //     method: "DELETE"
  //   })
  //   .then((res) => {
  //     if(res.ok) {
  //       setFavouritesData((prev) =>
  //         prev.filter((item) => item.id !== id))
  //       toggleFavourite(id)
  //     } else {
  //       throw new Error ('Błąd podczas usuwania')
  //     }
  //   })
  //   .catch((e)=> {
  //     alert(e.message)
  //   })
  // }

  return (
    <>
      {favouritesPokemons.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {favouritesPokemons.map((pokemon) => (
            <PokemonCard
            pokemon={pokemon}
            key={pokemon.id}
            handleFavouriteClick={handleFavouriteClick}
            handleArena={toggleArena}
            isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No favourite Pokemons, add some!
        </p>
      )}
    </>
  );
}


