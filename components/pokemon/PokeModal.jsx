import React, { useState, useEffect } from "react";
import Image from "next/image";
import GetTypeIcon from "./GetTypeIcon";
import { Table, Column } from "sticky-react-table";
import MatchupTable from "components/pokemon/MatchupTable";
import EvoChain from "./EvoChain";
import Expander from "components/Expander.jsx";
import GetPokeImg from "./GetPokeImg";
import CleanStrings from "components/CleanStrings";

export default function PokeModal(props) {
  const [primaryData, updatePrimaryData] = useState();
  const [fetchState, updateFetchState] = useState(false);
  const [types, updateTypes] = useState([]);
  const [speciesURL, updateSpeciesURL] = useState("");

  const getPokemon = async (endpoint) => {
    console.log("Starting fetch for pokemon specifics at ", endpoint);
    await fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        //Add Pokemon Average Stats to Received Data
        data.stats.forEach((stat) => {
          let average;
          switch (stat.stat.name) {
            case "hp":
              average = 70;
              break;
            case "attack":
              average = 81;
              break;
            case "defense":
              average = 75;
              break;
            case "special-attack":
              average = 73;
              break;
            case "special-defense":
              average = 72;
              break;
            case "speed":
              average = 69;
              break;
            default:
              average = "-";
              break;
          }
          stat.average = average;

          let delta =
            stat.base_stat - average > 0
              ? `+${stat.base_stat - average}`
              : stat.base_stat - average;
          let percentDelta =
            stat.base_stat - average > 0
              ? "+" +
                parseFloat((stat.base_stat / average - 1) * 100).toFixed(1)
              : parseFloat((stat.base_stat / average - 1) * 100).toFixed(1);
          stat.statDelta = delta;
          stat.deltaPercent = percentDelta;
        });
        console.log("Received data ", data);
        updatePrimaryData(data);

        //Set Modal to Block
        props.modalState("block");

        //Set the Pokemon Type into type State
        const foundTypes = data.types.map((row) => row.type.name);
        updateTypes(foundTypes);

        //Hide the pokedex background
        props.backgroundState(false);

        //Update the species URL, used to get evo data
        console.log("Updating species URL to id ", data.species.url);
        updateSpeciesURL(data.species.url);
      })
      .then(() => {
        console.log("Primary data is done fetching");
        updateFetchState(true);
      });
  };

  useEffect(() => {
    if (props.selected) {
      console.log("Current selected endpoint is now ", props.selected);
      getPokemon(props.selected);
    }
  }, [props.selected]);

  return (
    <div className="fullPageBG center">
      <div className="modalContent center">
        <div style={{ textAlign: "right" }}>
          <button
            className="closeButton redBG"
            onClick={() => {
              props.modalState("none");
              props.backgroundState(true);
            }}>
            Close
          </button>
        </div>
        {/* Name and Type */}
        <div>
          <div className="card ">
            <div>
              <h3>
                {fetchState && (
                  <CleanStrings
                    string={primaryData.name}
                    replace="-"
                    maxArray="3"
                    parenthesis
                  />
                )}
              </h3>
              {fetchState && <GetPokeImg id={primaryData.id} />}
            </div>
          </div>
          <br></br>
          <div className="flexRow">
            {types.map((row, i) => {
              return (
                <div key={i} className="card">
                  <div style={{ display: "block" }}>
                    <p>
                      <CleanStrings
                        string={row}
                        replace="-"
                        maxArray="3"
                        parenthesis
                      />
                    </p>
                  </div>
                  <GetTypeIcon type={row} />
                </div>
              );
            })}
          </div>
        </div>
        {/* Evolution Chain */}
        <Expander title="Evolution Chain">
          {fetchState && (
            <EvoChain
              speciesURL={speciesURL}
              updateEndpoint={props.updateEndpoint}
            />
          )}
        </Expander>
        {/* Matchup Table */}
        <Expander title="Match Ups" default={true}>
          {" "}
          <MatchupTable types={types} />
        </Expander>
        {/* Stats */}
        <Expander title="Stats">
          {/* Stat Table */}
          {fetchState && (
            <div className="">
              <table>
                <thead>
                  <tr className="tableHead">
                    <th>Height</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody className="blackBG">
                  <tr>
                    <td>{primaryData.height}</td>
                    <td>{primaryData.weight}</td>
                  </tr>
                </tbody>
              </table>

              <div>
                <Table
                  data={primaryData.stats}
                  rowSelection={false}
                  headerClassName="tableHead">
                  <Column
                    title="Stat"
                    dataKey="stat.name"
                    width={120}
                    className="tableCell"
                    cellRenderer={(props) => props.cellData.toUpperCase()}
                  />
                  <Column
                    title="Base"
                    dataKey="base_stat"
                    width={100}
                    className="tableCell"
                  />
                  <Column
                    title="Avg Pokemon"
                    dataKey="average"
                    width={100}
                    className="tableCell"
                  />
                  <Column
                    title="Delta"
                    dataKey="statDelta"
                    width={100}
                    className="tableCell"
                  />
                  <Column
                    title="Delta %"
                    dataKey="deltaPercent"
                    width={100}
                    className="tableCell"
                  />
                </Table>
              </div>
            </div>
          )}
        </Expander>
      </div>
    </div>
  );
}
