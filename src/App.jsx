import "./App.css";
import { useContext, useEffect, useState } from "react";
import { useFetchPokemons } from "./hooks/useFetchPokemons.js";
// import { PokemonsContext } from "./context/PokemonsContext.js"

import { Layout } from "./components/Layout/Layout.jsx";
import { Outlet } from "react-router-dom";
import { PokeDataContext } from "./context/PokeDataContext.jsx";

const BASE_URL = "https://pokeapi.co/api/v2";

export function App() {
  const { pokemonsData, setPokemonsData } = useContext(PokeDataContext);
  const { data, error, isLoading } = useFetchPokemons(
    `${BASE_URL}/pokemon?limit=30`,
  );

  // const [favoritePokemons, setFavoritePokemons] = useState([])

  useEffect(() => {
    setPokemonsData(data);
  }, [data]);

  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
}
