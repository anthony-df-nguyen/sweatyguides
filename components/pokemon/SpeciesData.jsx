import React, { useState, useEffect } from "react";
import GetPokeImg from "./GetPokeImg";
import CleanStrings from "components/CleanStrings";
import Expander from "components/Expander";

export default function SpeciesData(props) {
  const [array, updateArray] = useState([]);
  const [baseCapture,updateBaseCapture] = useState("")
  const [growthRate,updateGrowthRate] = useState("")

  const [eggGroup,updateEggGroup] = useState([]);

  useEffect(() => {
    const speciesURL = props.speciesURL;
    //console.log('speciesURL: ', speciesURL);
    const getChain = async () => {
      await fetch(speciesURL)
        .then((res) => res.json())
        .then((data) => {
        console.log('Species data: ', data);
          //Capture Rate
          const rate = data.capture_rate;
          updateBaseCapture(rate)

          //Growth Rate
          const growth = data.growth_rate.name;
          updateGrowthRate(<CleanStrings string={growth} />)

          //Find Egg Groups
          let eggs = []
          data.egg_groups.forEach((row) => {
            eggs.push(row.name)
          })
          updateEggGroup(eggs)
          
          //Find Evolution Chain
          const evoURL = data.evolution_chain.url;
          fetch(evoURL)
            .then((a) => a.json())
            .then((b) => {
              let evoData = [];
              if (b.chain) {
                //Base Pokemon
                evoData.push({
                  name: b.chain.species.name,
                  atLevel: null,
                  trigger: null,
                  stage: 1,
                  item: null,
                  id: b.chain.species.url
                    .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                    .replace("/", ""),
                });
                //Checks if there is a 2nd evolution
                if (b.chain.evolves_to.length > 0) {
                  b.chain.evolves_to.forEach((row, i) => {
                    const specialItem = row.evolution_details[0].item
                      ? row.evolution_details[0].item
                      : { name: "Special Item" };
                    evoData.push({
                      name: row.species.name,
                      atLevel: row.evolution_details[0].min_level,
                      trigger: row.evolution_details[0].trigger.name,
                      stage: 2,
                      item: specialItem,
                      id: row.species.url
                        .replace(
                          "https://pokeapi.co/api/v2/pokemon-species/",
                          ""
                        )
                        .replace("/", ""),
                    });

                    //Check if there is 3rd evolution
                    const nextRow =
                      row.evolves_to.length > 0 ? row.evolves_to : false;
                    if (nextRow) {
                      const specialItem2 = nextRow[0].evolution_details[0].item
                        ? nextRow[0].evolution_details[0].item
                        : { name: "Special Item" };
                      evoData.push({
                        name: nextRow[0].species.name,
                        atLevel: nextRow[0].evolution_details[0].min_level,
                        trigger: nextRow[0].evolution_details[0].trigger.name,
                        stage: 3,
                        item: specialItem2,
                        id: nextRow[0].species.url
                          .replace(
                            "https://pokeapi.co/api/v2/pokemon-species/",
                            ""
                          )
                          .replace("/", ""),
                      });
                    }
                  });
                }
                console.log("Done getting evolution chain data");
                updateArray(evoData);
              }
            });
        });
    };
    getChain();
  }, [props.speciesURL]);

  const updatePokemon = (name, e) => {
    e.target.offsetParent.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const newEndpoint = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    console.log("Setting a new endpoint due to evo chain click")
    props.updateEndpoint(newEndpoint);
  };

  const checkEvoTrigger = (i) => {
    const trigger = array[i].trigger;
    if (trigger === "level-up" && array[i].atLevel) {
      return `at level ${array[i].atLevel}`;
    } else if (trigger === "trade") {
      return "by trade";
    } else if (trigger === "use-item") {
      return (
        <>
          <span style={{display:'inline'}}>with </span>
          <CleanStrings string={array[i].item.name} replace="-" maxArray="2" />
        </>
      );
    } else {
      return "";
    }
  };
  return (
    <div>
      {/* Egg Group */}
      <div className="flexRow">
        <div className="card blackBG">
          <h3 className="">Capture Rate</h3>
          <div className="centerText">{baseCapture} out of 255</div>
        </div>
        <div className="card blackBG">
          <h3 className="">Growth Rate</h3>
          <div className="centerText">{growthRate}</div>
        </div>
        <div className="card blackBG">
          <h3 className="">Egg Group</h3>
          <div className="centerText">
            {" "}
            {eggGroup.length > 0 &&
              eggGroup.map((row, i) => {
                if (i !== 0) {
                  return (
                    <span>
                      , <CleanStrings key={i} string={row} position="inline" />
                    </span>
                  );
                } else {
                  return (
                    <CleanStrings key={i} string={row} position="inline" />
                  );
                }
              })}
          </div>
        </div>
      </div>
      {/* evolution */}
      <Expander title="Evolution Chain" bg="blackBG" >
        <div className="">       
          {/* If there is evo chain */}
          {array.length > 1 && (
            <div className="flexRow" style={{ justifyContent: "center" }}>
              {/* Base Pokemon */}
              <div
                className="hover"
                onClick={(e) => {
                  updatePokemon(array[0].name, e);
                }}>
                {" "}
                <div style={{ textAlign: "center" }}>
                  <h3>1</h3>
                  <a>
                    {" "}
                    {array[0] && (
                      <CleanStrings
                        string={array[0].name}
                        replace="-"
                        maxArray="3"
                        parenthesis
                      />
                    )}
                  </a>
                </div>
                {array[0] && <GetPokeImg id={array[0].id} />}
              </div>

              {/* 2nd Evo */}

              {array.map(
                (row, i) =>
                  row.stage === 2 && (
                    <div
                      key={i}
                      className="hover"
                      onClick={(e) => {
                        updatePokemon(row.name, e);
                      }}>
                      <h3>2</h3>
                      <a>
                        <div style={{ textAlign: "center" }}>
                          <CleanStrings
                            string={row.name}
                            replace="-"
                            maxArray="3"
                            parenthesis
                          />
                        </div>
                        {row.id && <GetPokeImg id={row.id} />}
                        <div style={{ textAlign: "center" }}>
                          {checkEvoTrigger(i)}
                        </div>
                      </a>
                    </div>
                  )
              )}

              {/* 3rd Evo */}

              {array.map(
                (row, i) =>
                  row.stage === 3 && (
                    <div
                      key={i}
                      className="hover"
                      onClick={(e) => {
                        updatePokemon(row.name, e);
                      }}>
                      <h3>3</h3>
                      <a>
                        <div style={{ textAlign: "center" }}>
                          <CleanStrings
                            string={row.name}
                            replace="-"
                            maxArray="3"
                            parenthesis
                          />
                        </div>
                        {row.id && <GetPokeImg id={row.id} />}
                        <div style={{ textAlign: "center" }}>
                          {checkEvoTrigger(i)}
                        </div>
                      </a>
                    </div>
                  )
              )}
            </div>
          )}
          {/* If there is no chain */}
          {array.length === 1 && <div>This Pokemon does not evolve</div>}
        </div>
      </Expander>
    </div>
  );
}
