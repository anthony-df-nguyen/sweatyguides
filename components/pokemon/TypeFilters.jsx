import React from 'react'
import Image from 'next/image'
import style from 'styles/pokemon/pokemon.module.scss'

export default function TypeFilters (props) {
  const types = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water'
  ]

  const findIcon = row => {
    const search = row
    return `/images/pokedex/icons/${search}.svg`
  }



  const filterType = async (row,i)=> {
      const buttons = document.querySelectorAll(".typeButton");
      buttons.forEach(row => row.classList.remove("active"))
      buttons[i].classList.add("active")

      const type = row
      const result = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(data => data.pokemon)
     
      const translatedArray = result.map(row => {
          return {
              name: row.pokemon.name,
              url: row.pokemon.url,
          }
      })
      translatedArray.sort((a,b) => a.name > b.name ? 1 : -1)
      props.function(translatedArray)
      const results = document.querySelector('#results')
      results.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  return (
    <div className="flexRow" style={{justifyContent:'stretch'}}>
      {types.map((row, i) => {
        return (
          <div
            key={i}
            className={style.typeButton + " card hoverBlue blackBG"}
            style={{ flexGrow: "1" }}
            onClick={() => filterType(row, i)}>
            <div style={{ display: "block", marginTop: "0rem" }}>
              <p className={style.typeName} key={i}>
                {row.toUpperCase()}
              </p>
            </div>

            <div
              className={style.typeIcon}>
              <Image
                src={findIcon(row)}
                height="1"
                width="1"
                layout="responsive"
              />
            </div>
          </div>
        );
      })}
    </div>
  )
}
