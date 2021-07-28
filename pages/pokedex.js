import React, { useEffect, useState } from "react";
import Page from "components/Page.jsx";
import Expander from "components/Expander.jsx";

import FullScreen from "components/FullScreen.jsx";
import ReactTable from "components/ReactTable";
import GetAllPokemon from "components/pokemon/GetAllPokemon"
import TextSearch from "components/TextSearch";
import PokeModal from "components/pokemon/PokeModal";

export default function Pokedex() {
 
  const [allList,updateAllList] = useState([])
  const [filteredList,updateFilteredList] = useState(allList)
  const [selected,updateSelected] = useState([])
  const [modalDisplay,updateModalDisplay] = useState('none')
  const getPokemon = async (endpoint) => {
     await fetch(endpoint).then(res => res.json()).then(data => {
         updateSelected(data);
         updateModalDisplay("block");
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

        <div style={{display:modalDisplay}}>
          <PokeModal array={selected} function={updateModalDisplay} />
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
