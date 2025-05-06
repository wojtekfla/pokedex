import { createContext } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const { darkMode, toggleDarkMode, clearDarkMode } = useDarkMode()


  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, clearDarkMode }}>
      { children }
    </ThemeContext.Provider>
  )

}



