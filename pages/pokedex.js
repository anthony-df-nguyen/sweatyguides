import React, { useEffect, useState } from "react";
import Page from "components/Page.jsx";
import Expander from "components/Expander.jsx";
import GetAllPokemon from "components/pokemon/GetAllPokemon";
import TypeFilters from "components/pokemon/TypeFilters";
import TextSearch from "components/TextSearch";
import PokeModal from "components/pokemon/PokeModal";
import ReactTable from "components/ReactTable";
import ABCFilter from "components/ABCFilter";

export default function Pokedex() {
  const [allList, updateAllList] = useState([]);
  const [filteredList, updateFilteredList] = useState(allList);
  const [selected, updateSelected] = useState([]);
  const [endPoint, updateEndPoint] = useState("");
  //console.log('endPoint: ', endPoint);
  const [modalDisplay, updateModalDisplay] = useState("none");

  const [textSearchDisplay, updateTextDisplay] = useState({
    display: "block",
    buttonClass: "activeLight",
  });
  const [typeSearchDisplay, updateTypeSearchDisplay] = useState({
    display: "none",
    buttonClass: "",
  });

  const [abcReset, updateabcReset] = useState(false);

  const [background, updateBackground] = useState(true);

  const getPokemon = async (endpoint) => {
    await fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        updateSelected(data);
        updateModalDisplay("block");
        updateBackground(false);
        updateEndPoint(endpoint);
      });
  };

  useEffect(() => {
    getPokemon(endPoint);
  }, [endPoint]);

  useEffect(() => {
    const bg = document.querySelector(".pageContent");
    if (!background) {
      bg.classList.add("noScrollBG");
    } else {
      bg.classList.remove("noScrollBG");
    }
  }, [background]);

  const toggleNameSearch = () => {
    updateTextDisplay({ display: "block", buttonClass: "activeLight" });
    updateTypeSearchDisplay({ display: "none", buttonClass: "" });
  };
  const toggleTypeSearch = () => {
    updateTextDisplay({ display: "none", buttonClass: "" });
    updateTypeSearchDisplay({ display: "block", buttonClass: "activeLight" });
  };

  //After fetching the full list, set filtered list to full list to initialize
  useEffect(() => {
    allList.length > 0 && updateFilteredList(allList);
  }, [allList]);

  const resetAll = () => {
    const search = document.querySelector("#textField");
    search && (search.value = "");
    updateFilteredList(allList);
    abcReset ? updateabcReset(false) : updateabcReset(true)
  };

  return (
    <div>
      <Page
        headTitle="Sweaty Guides | Pokedex"
        title="PokéDex"
        background="https://images6.alphacoders.com/328/thumb-1920-328013.jpg">
        <GetAllPokemon function={updateAllList} />

        {/* Mode Toggle */}
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

        {/* Text Search Bar */}
        <div style={{ display: textSearchDisplay.display }}>
          <div>
            <div style={{ width: "70%", display: "inline-block" }}>
              <TextSearch
                label="Search by text match"
                array={allList}
                function={updateFilteredList}
                abcStatus={abcReset}
                resetABC={updateabcReset}
              />
            </div>
            <button
              onClick={() => resetAll()}
              className="yellowBG centerText"
              style={{
                marginLeft: "10px",
                width: "calc(30% - 10px)",
                display: "inline-block",
              }}>
              Clear
            </button>
          </div>

          <ABCFilter
            array={allList}
            function={updateFilteredList}
            reset={abcReset}
            scrollIntoViewDiv="results"
          />
        </div>

        {/* Type Filters UI */}
        <div style={{ display: typeSearchDisplay.display }}>
          <TypeFilters array={filteredList} function={updateFilteredList} />
        </div>

        {/* Hidden Modal */}
        <div style={{ display: modalDisplay }}>
          <PokeModal
            array={selected}
            updateEndpoint={updateEndPoint}
            function={updateModalDisplay}
            backgroundState={updateBackground}
          />
        </div>

        {/* List of Pokemon Results */}
        <h2 style={{ paddingTop: "2rem" }} id="results">
          {filteredList.length > 0 && <>{filteredList.length} Pokemon</>}
        </h2>
        {filteredList.length > 0 && <p>Click a Pokémon to view details</p>}

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
