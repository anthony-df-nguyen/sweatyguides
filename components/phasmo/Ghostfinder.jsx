import React, { useState, useEffect } from "react";
import Objective from "components/phasmo/Objective";
import ghostJson from "components/phasmo/GhostJson";
import style from "styles/phasmo/phasmo.module.scss";

export default function Ghostfinder() {
  const [ghostArray, updateGhostArray] = useState(ghostJson);
  const [activeHints, updateActiveHints] = useState(0);
  const [searchTerms, updateTerms] = useState([]);
  const [cluesLeft, updateCluesLeft] = useState([]);
  const [clueLeftDisplay, updateClueLeftDisplay] = useState("none");

  const handleClick = (e) => {
    let box = e.target.classList;
    let term = e.target.id;
    let currentCount = activeHints;
    let termsArray = [...searchTerms];
    if (!box.contains("active") && activeHints < 3) {
      box.add("active");
      currentCount++;
      updateActiveHints(currentCount);
      termsArray.push(term);
      updateTerms(termsArray);
    } else if (box.contains("active")) {
      box.remove("active");
      currentCount--;
      updateActiveHints(currentCount);
      const position = termsArray.indexOf(term);
      termsArray.splice(position, 1);
      updateTerms(termsArray);
    } else {
      alert("Do not select more than 3 pieces of evidence");
    }
  };
  
  useEffect(() => {
    let temp = [...ghostJson];
    for (let i = 0; i < searchTerms.length; i++) {
      const newarray = temp.filter((row) => row.clues.includes(searchTerms[i]));
      newarray.length > 0
        ? updateGhostArray(newarray)
        : updateGhostArray([
            {
              name: "No ghosts found",
              clues: [],
              hints: [],
            },
          ]);
      temp = newarray;
    }
    if (searchTerms.length === 0) {
        updateGhostArray(ghostJson);
        updateClueLeftDisplay("none");
    } else {
        updateClueLeftDisplay("block");
    }
   
  }, [searchTerms]);

  useEffect(() => { 
    let remainingClues = [];
    ghostArray.forEach(row => {
        row.clues.forEach(clues => {
            if (
              clues !== searchTerms[0] &&
              clues !== searchTerms[1] &&
              clues !== searchTerms[2]
            ) {
              !remainingClues.includes(clues) && remainingClues.push(clues);
            }
        })
    })
    if (remainingClues.length === 0) {
         updateClueLeftDisplay("none");
    } else {
        updateCluesLeft(remainingClues);
    }
  }, [ghostArray]);

  return (
    <div>
      <div className="flexRow topMargin">
        <div className={style.objective} onClick={handleClick} id="EMF">
          EMF Level 5
        </div>
        <div className={style.objective} onClick={handleClick} id="Temps">
          Freezing Temps
        </div>
        <div className={style.objective} onClick={handleClick} id="Orb">
          Ghost Orb
        </div>
        <div className={style.objective} onClick={handleClick} id="Ghost Writing">
          Ghost Writing
        </div>
        <div className={style.objective} onClick={handleClick} id="Prints">
          Fingerprints
        </div>
        <div className={style.objective} onClick={handleClick} id="Spirit Box">
          Spirit Box
        </div>
      </div>
      <div className="topMargin" style={{ display: clueLeftDisplay }}>
        <p>
          Continue to look for{" "}
          {cluesLeft.map((row, i) => (
            <span className={style.remainingClue} key={i}>{row}</span>
          ))}
        </p>
      </div>
      <div className="grid2 topMargin">
        {ghostArray.map((row, z) => {
          return (
            <div key={z} className={style.ghostCard}>
              <div className={style.name}>{row.name}</div>
              <div>
                {row.clues.map((clue, i) => (
                  <div key={i} className={style.clue}>
                    {clue}
                  </div>
                ))}
              </div>
              <div className={style.hints}>
                <ul>
                  {row.hints.map((hints, y) => (
                    <li key={y}>{hints}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
