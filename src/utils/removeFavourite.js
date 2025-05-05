// export async function removeFavourite(pokemon, url, toggleFavourite) {
//   console.log('removing from favourites', pokemon)

//   try {
//     const response = await fetch (`${url}/pokemons/${pokemon.id}` , {
//       method: "DELETE",
//     })
    
//     if (response.ok) {
//       console.log(`Pokemon ${pokemon.name} został usunięty z kolekcji favourites`)
//       toggleFavourite(pokemon.id)
//     } else {
//       throw new Error(`Błąd podczas usuwania pokemona: ${response.statusText}`)
//     }
    
//   } catch (error) {
//     console.error('Error removing from favourites', error)
//   }
// }
