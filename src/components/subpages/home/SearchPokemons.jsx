import { useState } from "react"
import { Button } from "../../shared/Button"
 
export function SearchPokemons () {

  const [name, setName] = useState('')
  // console.log("name", name)

  return (

    <div className="flex justify-center items-center min-h-12 mt-1 bg-amber-100">
      <label className="h-8" htmlFor="pokemonName">Type name to search: </label>
      <input className="mx-2 px-2 h-8 border-2 border-gray-300 rounded-md" type="text" name="pokemonName" id="pokemonName" onChange={(e)=> setName(e.target.value) } placeholder=""  />
    </div>
  )
}