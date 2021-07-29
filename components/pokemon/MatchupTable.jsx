import React, { useState, useEffect } from "react";

export default function MatchupTable(props) {
  const [strengths, updateStrengths] = useState([]);
  const [weakness, updateWeakness] = useState([]);
  const [matchups, updateMatchups] = useState([]);
  console.log('matchups: ', matchups);

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
        //console.log("matchingData: ", matchingData);
        updateMatchups(matchingData);
      });
  };

  useEffect(() => {
    console.log("Searching from S/W");
    getTypeData();
  }, [props.types]);

  const getMatchingInfo = (key) => {
    const getLine = matchups.map(row => row[key])
    let separate = []
    getLine.forEach(line => {
        const separatedTerms = line.split(", ")
        separatedTerms.forEach(row => {
            !separate.includes(row) && separate.push(row)
        })
    })    
    return (
      <ul className="twoColumnList">
        {separate.map((row) => (
          <li className="noMargin">{row}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h3>Matchup Table</h3>
      <div>
        <div className="grid2 topMargin">
          <div className="card blackBG">
            <h3>Offensively</h3>
            <br></br>
            <div>
              {" "}
              <h4>Strong Against:</h4>
              {getMatchingInfo("Strong against")}
            </div>
            <br></br>
            <div>
              <h4>Weak Against:</h4>
              {getMatchingInfo("Weak against")}
            </div>
          </div>
          <div className="card blackBG">
            <h3>Defensively</h3>
            <br></br>
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
      </div>
    </div>
  );
}
