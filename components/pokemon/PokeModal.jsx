import React, { useState, useEffect } from "react";
import Image from "next/image";
import GetTypeIcon from "./GetTypeIcon";
import { Table, Column } from "sticky-react-table";
import MatchupTable from "components/pokemon/MatchupTable";
import EvoChain from "./EvoChain";
import Expander from "components/Expander.jsx";
import GetPokeImg from "./GetPokeImg";

export default function PokeModal(props) {
  const [array, updateArray] = useState(props.array);
  const [types, updateTypes] = useState([]);
  const [speciesURL, updateURL] = useState("");

  useEffect(() => {
    if (array.types) {
      const foundTypes = array.types.map((row) => row.type.name);
      updateTypes(foundTypes);
    }
  }, [array.types]);
  useEffect(() => {
    const newArray = props.array;
    updateArray(newArray);
  }, [props.array]);
  useEffect(() => {
    if (array.species) {
      const url = array.species.url;
      updateURL(url);
    }
  }, [array.species]);
  //console.log(array)

  return (
    <div className="fullPageBG center">
      <div className="modalContent center">
        <div style={{ textAlign: "right" }}>
          <button
            className="closeButton redBG"
            onClick={() => {
              props.function("none");
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
                {" "}
                {array.name && `#${array.id} ${array.name.toUpperCase()}`}
              </h3>
              {array.id && <GetPokeImg id={array.id} />}
            </div>
            <div className="flexRow ">
              {types.map((row, i) => {
                return (
                  <div key={i} className="card">
                    <div style={{ display: "block", marginTop: "1rem" }}>
                      <p>{row.toUpperCase()}</p>
                    </div>
                    <GetTypeIcon type={row} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Evolution Chain */}
        <Expander title="Evolution Chain">
          {array.species && (
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
                  <td>{array.height}</td>
                  <td>{array.weight}</td>
                </tr>
              </tbody>
            </table>

            <div>
              {array.stats && (
                <Table
                  data={array.stats}
                  rowSelection={false}
                  headerClassName="tableHead">
                  <Column
                    title="Stat"
                    dataKey="stat.name"
                    width={300}
                    className="tableCell"
                    cellRenderer={(props) => props.cellData.toUpperCase()}
                  />
                  <Column
                    title="Base Value"
                    dataKey="base_stat"
                    width={300}
                    className="tableCell"
                  />
                </Table>
              )}
            </div>
          </div>
        </Expander>
      </div>
    </div>
  );
}
