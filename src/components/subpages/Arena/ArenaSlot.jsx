import clsx from 'clsx'
import { PokemonCard } from "../Home/PokemonCard" 

export function ArenaSlot ({pokemon, status, onRemove}) {

  return (
    <div className={clsx(
      'rounded-lg p-4 shadow-md transition-all duration-500 transform',
      status === 'winner' && 'border-4 border-green-500 scale-110',
      status === 'loser' && 'opacity-50 grayscale',
      !status && 'border-2 border-gray-300'
    )}>
      {pokemon ? (
        <div onClick={onRemove} className='cursor-pointer'>
          <PokemonCard pokemon={pokemon} />
        </div>
      ) : (
        <div className='flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-8 text-center text-gray-500 dark:text-gray-400'>
          <p>Select Pokemon to Arena</p>
        </div>
      )}
    </div>
  )
}

