import { createContext, useState, useEffect } from "react"

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUser, setLoggedUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // const storedLoggedIn = localStorage.getItem('isLoggedIn')
    const storedUser = localStorage.getItem('loggedUser')

    if (storedUser) {
      setIsLoggedIn(true)
      setLoggedUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  return <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser, isLoading}}>
    {children}
  </LoginContext.Provider>
}