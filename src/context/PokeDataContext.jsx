import { createContext, useState } from "react"

export const PokeDataContext = createContext([])

export const PokeDataProvider = ({ children }) => {
  const [pokemonsData, setPokemonsData] = useState([])

  const toggleFavourite = (id) => {
    const newData = pokemonsData.map((item) => {
      return Number(item.id) === Number(id) ? {...item, isFavourite: !item.isFavourite} : {...item}
    })
    console.log('DATA in context', newData)
    setPokemonsData(newData)
  }

  return (
    <PokeDataContext.Provider value={{ pokemonsData, setPokemonsData, toggleFavourite }}>
      {children}
    </PokeDataContext.Provider>
  )
}
