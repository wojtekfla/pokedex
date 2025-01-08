import { createContext, useState } from "react"

export const PokeDataContext = createContext([])

export const PokeDataProvider = ({ children }) => {
  const [pokemonsData, setPokemonsData] = useState([])

  const toggleFavourite = (id) => {
    const newData = pokemonsData.map((item) => {
      console.log(item)
      return Number(item.id) === Number(id) ? {...item, isFavourite: !item.isFavourite}  : {...item}
    })
    console.log('DATA in context', newData)
    setPokemonsData(newData)
  }

  const toggleArena = (id) => {
    const newData = pokemonsData.map((item) => {
      console.log(item)
      return Number(item.id) === Number(id) ? {...item, isArena: !item.isArena}  : {...item}
    })
    console.log('DATA in context', newData)
    setPokemonsData(newData)
  }
  

  const handleDataFromJson = (data) => {
    const newData = pokemonsData.map((item) => {
      const element = data.find((itemFromJson) => itemFromJson.id === item.id)
      if (element) {
        return {...item, ...element}
      } else {
        return {...item}
      }
    })
    setPokemonsData(newData)
  }

  return (
    <PokeDataContext.Provider value={{ pokemonsData, setPokemonsData, toggleFavourite, handleDataFromJson, toggleArena }}>
      {children}
    </PokeDataContext.Provider>
  )
}
