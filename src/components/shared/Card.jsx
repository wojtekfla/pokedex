export function Card ({props, className}) {
  console.log('props', props)
  const url = props

  const getPokemon = (url) => {
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      return pokeData = res
    })
  }
 

  return (
    <li className={className}>
      <div>
       {/* <p>Name: {getPokemon().name}</p> */}
      </div>
    </li>
  )

  // return (
  //   <li className={className}>
  //     <div>
  //       <img />
  //     </div>
  //     <p>Name: {props.name}</p>
  //     <span>Height: {props.height}</span>
  //     <span>Weight: {props.weight}</span>
  //     <span>Base experience: {props.base_experience}</span>
  //     <span>Ability: {ability}</span>
  //   </li>
  // )
}