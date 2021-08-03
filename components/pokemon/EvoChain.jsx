import React, { useState, useEffect } from "react";

export default function EvoChain(props) {
  const [array, updateArray] = useState([]);
  //console.log("array: ", array);
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
              //console.log(b.chain);
              if (b.chain) {
                //Base Pokemon
                evoData.push({
                  name: b.chain.species.name,
                  atLevel: null,
                  trigger: null,
                });
                //Checks if there is a 2nd evolution
                if (b.chain.evolves_to.length > 0) {
                  b.chain.evolves_to.forEach((row) => {
                    evoData.push({
                      name: row.species.name,
                      atLevel: row.evolution_details[0].min_level,
                      trigger: row.evolution_details[0].trigger,
                    });
                    //Check if there is 3rd evolution
                    const nextRow = row.evolves_to;
                    if (nextRow.length > 0) {
                      evoData.push({
                        name: nextRow[0].species.name,
                        atLevel: nextRow[0].evolution_details[0].min_level,
                        trigger: nextRow[0].evolution_details[0].trigger,
                      });
                    }
                  });
                }
                updateArray(evoData);
              }
            });
        });
    };
    getChain();
  }, [props]);

    const updatePokemon = (name) => {
      const newEndpoint = `https://pokeapi.co/api/v2/pokemon/${name}/`;
      props.updateEndpoint(newEndpoint);
    };
  return (
    <div>
      <div className="flexRow">
        <div
          className="card blackBG"
          onClick={() => {
            updatePokemon(array[0].name);
          }}>
          {" "}
          <div style={{ textAlign: "center" }}>
            <a> {array[0] && array[0].name.toUpperCase()}</a>
          </div>
        </div>
        {array.map(
          (row, i) =>
            i != 0 && (
              <div
                key={i}
                className="card blackBG"
                onClick={() => {
                  updatePokemon(row.name);
                }}>
                <a>
                  <div style={{ textAlign: "center" }}>
                    {row.name.toUpperCase()}
                  </div>
                  {/* <div style={{ textAlign: "center" }}>
                    at level {row.atLevel}
                  </div> */}
                </a>
              </div>
            )
        )}
      </div>
    </div>
  );
}
