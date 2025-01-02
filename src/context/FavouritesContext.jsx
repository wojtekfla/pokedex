import { createContext, useState } from "react"

export const FavouritesContext = createContext([])

export const FavouritesProvider = ({ children }) => {
  const [favouritesData, setFavouritesData] = useState([])

  return (
    <FavouritesContext.Provider value={{ favouritesData, setFavouritesData }}>
      {children}
    </FavouritesContext.Provider>
  )
}