import React, { useState, useEffect } from "react";
import GetPokeImg from "./GetPokeImg";

export default function EvoChain(props) {
  const [array, updateArray] = useState([]);

  useEffect(() => {
    const speciesURL = props.speciesURL;
    //console.log('speciesURL: ', speciesURL);
    const getChain = async () => {
      await fetch(speciesURL)
        .then((res) => res.json())
        .then((data) => {
          const evoURL = data.evolution_chain.url;
          fetch(evoURL)
            .then((a) => a.json())
            .then((b) => {
              let evoData = [];
              //console.log(b.chain)
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
      return `with ${array[i].item.name}`;
    } else {
      return "";
    }
  };
  return (
    <div>
      {/* If there is evo chain */}
      {array.length > 1 && (
        <div className="flexRow" style={{ justifyContent: "center" }}>
          {/* Base Pokemon */}
          <div
            className="card blackBG hover"
            onClick={(e) => {
              updatePokemon(array[0].name, e);
            }}>
            {" "}
            <div style={{ textAlign: "center" }}>
              <h3>1</h3>
              <a> {array[0] && array[0].name.toUpperCase()}</a>
            </div>
            {array[0] && <GetPokeImg id={array[0].id} />}
          </div>

          {/* 2nd Evo */}

          {array.map(
            (row, i) =>
              row.stage === 2 && (
                <div
                  key={i}
                  className="card blackBG hover"
                  onClick={(e) => {
                    updatePokemon(row.name, e);
                  }}>
                  <h3>2</h3>
                  <a>
                    <div style={{ textAlign: "center" }}>
                      {row.name.toUpperCase()}
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
                  className="card blackBG hover"
                  onClick={(e) => {
                    updatePokemon(row.name, e);
                  }}>
                  <h3>3</h3>
                  <a>
                    <div style={{ textAlign: "center" }}>
                      {row.name.toUpperCase()}
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
  );
}
