import React, { useEffect, useState } from 'react'
import Page from 'components/Page.jsx'
import Expander from 'components/Expander.jsx'
import GetAllPokemon from 'components/pokemon/GetAllPokemon'
import TypeFilters from 'components/pokemon/TypeFilters'
import TextSearch from 'components/TextSearch'
import PokeModal from 'components/pokemon/PokeModal'
import ReactTable from "components/ReactTable";

export default function Pokedex () {
  const [allList, updateAllList] = useState([])
  const [filteredList, updateFilteredList] = useState(allList)
  const [selected, updateSelected] = useState([])
  const [modalDisplay, updateModalDisplay] = useState('none')

  const [textSearchDisplay, updateTextDisplay] = useState({display:'block',buttonClass: 'activeLight'})
  const [typeSearchDisplay, updateTypeSearchDisplay] = useState({display:'none',buttonClass: ''})

  const [background,updateBackground] = useState(true)

  const getPokemon = async endpoint => {
    await fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        updateSelected(data)
        updateModalDisplay('block')
        updateBackground(false)
      })
  }

  useEffect(() => {
    const bg = document.querySelector(".pageContent");
    if (!background) {
      bg.classList.add("noScrollBG");
    } else {
      bg.classList.remove("noScrollBG");
    }
  }, [background])


  const toggleNameSearch = () => {
    updateTextDisplay({display:'block',buttonClass: 'activeLight'});
    updateTypeSearchDisplay({display:'none',buttonClass: ''})
  }
  const toggleTypeSearch = () => {
    updateTextDisplay({display:'none',buttonClass: ''});
    updateTypeSearchDisplay({display:'block',buttonClass: 'activeLight'})
  }

  //After fetching the full list, set filtered list to full list to initialize
  useEffect(() => {
    allList.length > 0 && updateFilteredList(allList)
  }, [allList])

  return (
    <div>
      <Page
        headTitle="Sweaty Guides | Pokedex"
        title="PokéDex"
        background="https://images6.alphacoders.com/328/thumb-1920-328013.jpg">
        <GetAllPokemon function={updateAllList} />

        <Expander title="Type Matchup Table">
          <ReactTable
            data="/pokedex/types.json"
            head={[
              {
                name: "Name",
                width: "100",
              },
              {
                name: "Strong against",
                width: "200",
              },
              {
                name: "Weak against",
                width: "200",
              },
              {
                name: "Resistant to",
                width: "200",
              },
              {
                name: "Weak to",
                width: "200",
              },
            ]}
          />
        </Expander>

        <div
          style={{
            display: "block",
            margin: "2rem auto 0 auto",
            textAlign: "center",
          }}>
          <button
            style={{ marginRight: "10px" }}
            className={textSearchDisplay.buttonClass}
            onClick={() => toggleNameSearch()}>
            Search by Name
          </button>
          <button
            onClick={() => toggleTypeSearch()}
            className={typeSearchDisplay.buttonClass}>
            Search by Type
          </button>
        </div>

        <div style={{ display: textSearchDisplay.display }}>
          {" "}
          <TextSearch
            label="Search Pokemon by Name"
            array={allList}
            function={updateFilteredList}
          />
        </div>

        <div style={{ display: typeSearchDisplay.display }}>
          <TypeFilters array={filteredList} function={updateFilteredList} />
        </div>

        <div style={{ display: modalDisplay }}>
          <PokeModal
            array={selected}
            function={updateModalDisplay}
            backgroundState={updateBackground}
          />
        </div>
        <h2 style={{ paddingTop: "2rem" }} id="results">
          {filteredList.length} Pokemon
        </h2>
        <div className="grid4lock2 topMargin">
          {filteredList.map((row, i) => (
            <a
              className="card hoverBlue"
              key={i}
              onClick={(e) => getPokemon(row.url)}>
              {row.name.toUpperCase()}
            </a>
          ))}
        </div>
      </Page>
    </div>
  );
}
