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
              //console.log(b);
              if (b.chain) {
                //Base Pokemon
                evoData.push({
                  name: b.chain.species.name,
                  atLevel: null,
                  trigger: null,
                });
                if (b.chain.evolves_to.length > 0) {
                  b.chain.evolves_to.forEach((row) => {
                    evoData.push({
                      name: row.species.name,
                      atLevel: row.evolution_details[0].min_level,
                      trigger: row.evolution_details[0].trigger,
                    });
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
  return (
    <div className="grid3">
      {array.map((row, i) => (
        <div key={i}>
          <div style={{ textAlign: "center" }}>{row.name.toUpperCase()}</div>
          <div style={{ textAlign: "center" }}>{row.atLevel}</div>
        </div>
      ))}
    </div>
  );
}
