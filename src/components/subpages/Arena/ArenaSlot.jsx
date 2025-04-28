import { PokemonCard } from "../Home/PokemonCard" 

export function ArenaSlot ({pokemon, label, status}) {

  let base = 'h-full min-h-[200px] flex flex-col items-center justify-center rounded border-2 p-4'

  if (status === 'winner') {
    base += 'border-green-500'
  } else if (status === 'loser') {
    base += 'opacity-50 border-gray-300 dark:border-gray-600'
  } else {
    base += 'border-gray-300 dark:border-gray-600'
  }

  return (
    <div className={base}>
      {pokemon ? (
        <PokemonCard pokemon={pokemon} isLoggedIn={true}/>
      ) : (
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
      )}
    </div>
  )
}