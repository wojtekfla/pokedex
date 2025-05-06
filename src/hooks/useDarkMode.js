import { useEffect, useState } from 'react'

export function useDarkMode () {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if(darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  },[darkMode])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const clearDarkMode = () => {
    setDarkMode(false)
    localStorage.removeItem('theme')
  }

  return { darkMode, toggleDarkMode, clearDarkMode }
}