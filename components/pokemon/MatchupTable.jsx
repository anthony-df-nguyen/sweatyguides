import Expander from "components/Expander";
import React, { useState, useEffect } from "react";

export default function MatchupTable(props) {
  const [matchups, updateMatchups] = useState([]);

  const [useArray, updateUseArray] = useState([]);
  const [avoidUsing, updateAvoidUsing] = useState([]);

  const getTypeData = async () => {
    await fetch("/pokedex/types.json")
      .then((res) => res.json())
      .then((data) => {
        const matchingData = [];
        props.types.forEach((row) => {
          const typeMatch = data.find((i) => {
            const lowercase = i.Name.toLowerCase();
            lowercase === row && matchingData.push(i);
          });
        });
        //Clean Strings with "(No Effect)"
        matchingData.forEach((line) => {
          if (line["Weak against"].includes("(no effect)")) {
            const cleanString = line["Weak against"].replace(" (no effect)","");
            line["Weak against"] = cleanString;
          }
        });
        updateMatchups(matchingData);
      });
  };

  useEffect(() => {
    getTypeData();
  }, [props.types]);

  useEffect(() => {
    let avoidUsingArray = [];
    let useArray = [];

    //Optimizing matchups if fighting against this pokemon
    matchups.forEach((row) => {
      //Parsing List of Types to Possibly Avoid Using
      const strongAgainst = row["Strong against"].split(", ");
      const resistantTo = row["Resistant to"].split(", ");
      const whatToAvoidUsingInitial = [...strongAgainst, ...resistantTo];

      avoidUsingArray.push(...whatToAvoidUsingInitial);

      //Parsing List of Types to Possibly Use
      const weakTo = row["Weak to"].split(", ");
      const weakAgainst = row["Weak against"].split(", ");
      const whatToUseInitial = [...weakTo, ...weakAgainst];

      //Check if any type is in the avoid array
      const optimalUse = whatToUseInitial.filter((type) => {
        return !avoidUsingArray.includes(row) && type;
      });
      useArray.push(...optimalUse);
    });

    //Remove Duplicates from Both Lists
    const whatToAvoidUsingNoDupes = [...new Set(avoidUsingArray)];
    const whatToUseNoDupe = [...new Set(useArray)];

    //Optimize the 'Use' list by taking out types that the pokemon is resistant to
    const optimalUse = [];
    whatToUseNoDupe.forEach((row) => {
      if (!whatToAvoidUsingNoDupes.includes(row)) {
        optimalUse.push(row);
      }
    });
    updateAvoidUsing(whatToAvoidUsingNoDupes);
    updateUseArray(optimalUse);
  }, [matchups]);

  const getMatchingInfo = (key) => {
    const getLine = matchups.map((row) => row[key]);
    let separate = [];
    getLine.forEach((line) => {
      const separatedTerms = line.split(", ");
      separatedTerms.forEach((row) => {
        !separate.includes(row) && separate.push(row);
      });
    });
    return (
      <ul className="twoColumnList">
        {separate.map((row, i) => (
          <li className="noMargin" key={i}>
            {row}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3 className="leftText">
        Strategic Match Up
      </h3>
      <p className="leftText">
        Types this Pokemon is weak against either offensively, defensively, or both
      </p>

      <div className="grid2 topMargin">
        <div className="card blackBG">
          <h2 className="blue">Use</h2>
          <ul className="twoColumnList">
            {useArray.map((row) => (
              <li className="noMargin">{row}</li>
            ))}
          </ul>
        </div>
        <div className="card blackBG">
          <h2 className="red">Avoid</h2>
          <ul className="twoColumnList">
            {avoidUsing.map((row) => (
              <li className="noMargin">{row}</li>
            ))}
          </ul>
        </div>
      </div>
      <Expander title="Full Detail" bg="blackBG">
        <div className="grid2">
          <div className="">
            <h3>Offensively</h3>
            <div>
              {" "}
              <h4 className="">Strong Against:</h4>
              {getMatchingInfo("Strong against")}
            </div>
            <br></br>
            <div>
              <h4>Weak Against:</h4>
              {getMatchingInfo("Weak against")}
            </div>
          </div>
          <div className="">
            <h3>Defensively</h3>
            <div>
              <h4>Strong Against:</h4>
              {getMatchingInfo("Resistant to")}
            </div>
            <br></br>
            <div>
              <h4>Weak Against:</h4>
              {getMatchingInfo("Weak to")}
            </div>
          </div>
        </div>
      </Expander>
    </div>
  );
}
