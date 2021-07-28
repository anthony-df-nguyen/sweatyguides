import React, { useEffect, useState } from "react";
import Page from "components/Page.jsx";
import Expander from "components/Expander.jsx";
import Image from "next/image";
import FullScreen from "components/FullScreen.jsx";
import ReactTable from "components/ReactTable";
import GetAllPokemon from "components/pokemon/GetAllPokemon"
import TextSearch from "components/TextSearch";

export default function Pokedex() {
 
  const [allList,updateAllList] = useState([])
  const [filteredList,updateFilteredList] = useState(allList)
  const [selected,updateSelected] = useState([])
  const getPokemon = async (endpoint) => {
     await fetch(endpoint).then(res => res.json()).then(data => {
         updateSelected(data);
     });
  }

  //After fetching the full list, set filtered list to full list to initialize
  useEffect(() => {
    allList.length > 0 && updateFilteredList(allList);
  }, [allList]);

  return (
    <div>
      <Page title="Pokedex">
        <GetAllPokemon function={updateAllList} />
        <TextSearch
          label="Filter List of Pokemon"
          array={allList}
          function={updateFilteredList}
        />

        <div className="flexRow topMargin">
          <div className="card">
            <div>
              <h3> {selected.name && selected.name.toUpperCase()}</h3>
              <div style={{display:'block',margin:"0 auto",height:"8rem",width:"8rem"}}>
                {selected.sprites && (
                  <Image
                    src={selected.sprites.front_default}
                    height="2"
                    width="2"
                    layout="responsive"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="card">
            <div>
              <h3>Type: </h3>
              {selected.types &&
                selected.types.map((row, i) => {
                  return <p key={i}>{row.type.name.toUpperCase()}</p>;
                })}
            </div>
          </div>
        </div>

        <div className="grid4lock2 topMargin4">
          {filteredList.map((row, i) => (
            <div key={i} onClick={(e) => getPokemon(row.url)}>
              {row.name.toUpperCase()}
            </div>
          ))}
        </div>
      </Page>
    </div>
  );
}
