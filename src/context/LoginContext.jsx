import { createContext, useState } from "react"

export const LoginContext = createContext(null)

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUser, setLoggedUser] = useState(null)

  return <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser}}>
    {children}
  </LoginContext.Provider>
}