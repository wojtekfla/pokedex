import { createContext, useContext, useState } from "react"
import { PokeDataContext } from "./PokeDataContext"

export const FavouritesContext = createContext([])

export const FavouritesProvider = ({ children }) => {
  const [favouritesData, setFavouritesData] = useState([])
  const {pokemonsData, setPokemonsData} = useContext(PokeDataContext)

  const toggleFavourite = (id) => {
    const newData = pokemonsData.map((item) => {
      return Number(item.id) === Number(id) ? {...item, isFavourite: !item.isFavourite}  : {...item}
    })
    console.log('DATA in context', newData)
    setPokemonsData(newData)
  }

  return (
    <FavouritesContext.Provider value={{ favouritesData, setFavouritesData, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}