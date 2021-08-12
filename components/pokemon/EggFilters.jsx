import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "styles/pokemon/pokemon.module.scss";

export default function EggFilters(props) {
  const eggGroups = "https://pokeapi.co/api/v2/egg-group/";
  const [eggArray, updateEggArray] = useState([]);
  const [active, updateActive] = useState(props.display);

  const [fetchOnce, updateFetchOnce] = useState(0);

  const filterType = async (row, i) => {
    const buttons = document.querySelectorAll(".typeButton");
    buttons.forEach((row) => row.classList.remove("active"));
    buttons[i].classList.add("active");

    const result = await fetch(row.url)
      .then((res) => res.json())
      .then((data) => data.pokemon_species);
    const translatedArray = result.map((row) => {
      return {
        name: row.name,
        url: `https://pokeapi.co/api/v2/pokemon/${row.name}`,
      };
    });

    translatedArray.sort((a, b) => (a.name > b.name ? 1 : -1));
    props.function(translatedArray);
    const results = document.querySelector("#results");
    results.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const findIcon = (row) => {
    let search = row.name;
    if (search === "water1" || search === "water2" || search === "water3") {
      return `/images/pokedex/icons/water.svg`;
    }
    if (search === "plant") {
      return `/images/pokedex/icons/grass.svg`;
    } else {
      return `/images/pokedex/icons/${search}.svg`;
    }
  };

  useEffect(() => {
    const getEggGroups = async () => {
      console.log("Fetching egg groups");
      await fetch(eggGroups)
        .then((res) => res.json())
        .then((data) => {
          let removeDitto = data.results.filter((a) => a.name != "ditto");
          const sorted = removeDitto.sort((a, b) => (a.name > b.name ? 1 : -1));
          updateEggArray(sorted);
        })
        .then(() => {
          updateFetchOnce(1);
          console.log("Done fetching egg groups");
        });
    };

    //Only Fetch Egg Data When Display is Active
    if (props.display === "block") {
      // Only Fetch The Data the First Load
      if (fetchOnce === 0) {
        getEggGroups();
      }
      updateActive(true);
    }
  }, [props.display]);

  return (
    <div className="flexRow">
      {active &&
        eggArray.map((row, i) => {
          return (
            <div
              key={i}
              className={
                "typeButton card hoverBlue blackBG"
              }
              style={{ flexGrow: "1" }}
              onClick={() => filterType(row, i)}>
              <div style={{ display: "block", marginTop: "0rem" }}>
                <p className={style.typeName} key={i}>
                  {row.name.toUpperCase()}
                </p>
              </div>
              <div className={style.typeIcon}>
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
  );
}
