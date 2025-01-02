import { createContext, useState } from "react"

export const PokeDataContext = createContext([])

export const PokeDataProvider = ({ children }) => {
  const [pokemonsData, setPokemonsData] = useState([])

  return (
    <PokeDataContext.Provider value={{ pokemonsData, setPokemonsData }}>
      {children}
    </PokeDataContext.Provider>
  )
}
