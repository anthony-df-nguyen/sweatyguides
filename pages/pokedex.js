import React, { useEffect, useState } from "react";
import Page from "components/Page.jsx";
import Expander from "components/Expander.jsx";
import GetAllPokemon from "components/pokemon/GetAllPokemon";
import TypeFilters from "components/pokemon/TypeFilters";
import EggFilters from "components/pokemon/EggFilters";
import TextSearch from "components/TextSearch";
import PokeModal from "components/pokemon/PokeModal";
import ReactTable from "components/ReactTable";
import ABCFilter from "components/ABCFilter";
import CleanStrings from "components/CleanStrings";

export default function Pokedex() {
  const [allList, updateAllList] = useState([]);
  const [filteredList, updateFilteredList] = useState(allList);
  const [selected, updateSelected] = useState(false);
  const [modalDisplay, updateModalDisplay] = useState("none");

  const [textSearchDisplay, updateTextDisplay] = useState({
    display: "block",
    buttonClass: "activeLight",
  });
  const [typeSearchDisplay, updateTypeSearchDisplay] = useState({
    display: "none",
    buttonClass: "",
  });
  const [eggSearchDisplay, updateEggSearchDisplay] = useState({
    display: "none",
    buttonClass: "",
  });

  const [abcReset, updateabcReset] = useState(false);
  const [background, updateBackground] = useState(true);

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
    updateEggSearchDisplay({ display: "none", buttonClass: "" });
  };
  const toggleTypeSearch = () => {
    updateTextDisplay({ display: "none", buttonClass: "" });
    updateTypeSearchDisplay({ display: "block", buttonClass: "activeLight" });
    updateEggSearchDisplay({ display: "none", buttonClass: "" });
  };
  const toggleEggSearch = () => {
    updateTextDisplay({ display: "none", buttonClass: "" });
    updateTypeSearchDisplay({ display: "none", buttonClass: "" });
    updateEggSearchDisplay({ display: "block", buttonClass: "activeLight" });
  };

  //After fetching the full list, set filtered list to full list to initialize
  useEffect(() => {
    if (allList.length > 0) {
      console.log("Setting the filteredList to the allList");
      updateFilteredList(allList);
    }
  }, [allList]);

  const resetAll = () => {
    const search = document.querySelector("#textField");
    const buttons = document.querySelectorAll(".typeButton");
    buttons.forEach((row) => row.classList.remove("active"));
    search && (search.value = "");
    updateFilteredList(allList);
    abcReset ? updateabcReset(false) : updateabcReset(true);
  };

  return (
    <div>
      <Page
        headTitle="Sweaty Guides | Pokedex"
        title="PokéDex"
        background="https://images6.alphacoders.com/328/thumb-1920-328013.jpg">
        {/* PokeDex */}
        <Expander title="PokéDex" default>
          {" "}
          <GetAllPokemon function={updateAllList} />
          <h3 className="leftText">Find Pokemon by:</h3>
          {/* Mode Toggle */}
          <br></br>
          <div className="flexRow">
            <div
              className={
                textSearchDisplay.buttonClass + " button centerText"
              }
              onClick={() => toggleNameSearch()}>
              Name
            </div>
            <div
              onClick={() => toggleTypeSearch()}
              className={
                typeSearchDisplay.buttonClass + " button centerText"
              }>
              Type
            </div>
            <div
              onClick={() => toggleEggSearch()}
              className={eggSearchDisplay.buttonClass + " button centerText"}>
              Egg Group
            </div>
          </div>
          <br></br>
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
            <TypeFilters
              array={filteredList}
              function={updateFilteredList}
              display={typeSearchDisplay.display}
            />
          </div>
          {/* Egg Filter UI */}
          <div style={{ display: eggSearchDisplay.display }}>
            <EggFilters
              array={filteredList}
              function={updateFilteredList}
              display={eggSearchDisplay.display}
            />
          </div>
          {/* Hidden Modal */}
          <div style={{ display: modalDisplay }}>
            <PokeModal
              selected={selected}
              updateEndpoint={updateSelected}
              modalState={updateModalDisplay}
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
                className="card hoverBlue blackBG"
                key={i}
                onClick={(e) => {
                  updateSelected(row.url);
                  updateModalDisplay("block"), updateBackground(false);
                }}>
                {
                  <CleanStrings
                    string={row.name}
                    replace="-"
                    maxArray="3"
                    parenthesis
                  />
                }
              </a>
            ))}
          </div>
        </Expander>

        {/* Type Matchup */}
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
                width: "175",
              },
              {
                name: "Weak against",
                width: "175",
              },
              {
                name: "Resistant to",
                width: "175",
              },
              {
                name: "Weak to",
                width: "175",
              },
            ]}></ReactTable>
        </Expander>

        {/* Pokeballs */}
        <Expander title="PokeBalls">
          <h2 className="leftText">Normal PokeBalls</h2>
          <ReactTable
            data="/pokedex/normalballs.json"
            head={[
              {
                name: "Name",
                width: "150",
              },
              {
                name: "Detail",
                width: "400",
              },
              {
                name: "Cost",
                width: "100",
              },
              {
                name: "Rate",
                width: "100",
              },
            ]}></ReactTable>
          <h2 className="leftText topMargin">Special PokeBalls</h2>
          <ReactTable
            data="/pokedex/specialballs.json"
            head={[
              {
                name: "Name",
                width: "150",
              },
              {
                name: "Detail",
                width: "400",
              },
              {
                name: "Cost",
                width: "100",
              },
              {
                name: "Rate",
                width: "100",
              },
            ]}></ReactTable>
        </Expander>
      </Page>
    </div>
  );
}
