import React, { useState, useEffect } from "react";
import Image from "next/image";
import GetTypeIcon from "./GetTypeIcon";
import { Table, Column } from "sticky-react-table";
import MatchupTable from "components/pokemon/MatchupTable";

export default function PokeModal(props) {
  const [types, updateTypes] = useState([]);
  useEffect(() => {
    if (props.array.types) {
      const foundTypes = props.array.types.map((row) => row.type.name);     
      updateTypes(foundTypes);
    }
  }, [props.array.types]);

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

        <div className="flexRow">
          <div className="card ">
            <div>
              <h3>
                {" "}
                {props.array.name &&
                  `#${props.array.id} ${props.array.name.toUpperCase()}`}
              </h3>
              <div
                style={{
                  display: "block",
                  margin: "0 auto",
                  height: "8rem",
                  width: "8rem",
                }}>
                {props.array.sprites && (
                  <Image
                    src={props.array.sprites.front_default}
                    height="1"
                    width="1"
                    layout="responsive"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="card">
            <div>
              <h3>Type</h3>
              <br></br>
              <div className="flexRow">
                {types.map((row, i) => {
                  return (
                    <div>
                      <div style={{ display: "block", marginTop: "1rem" }}>
                        <p key={i}>{row.toUpperCase()}</p>
                      </div>
                      <GetTypeIcon type={row} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="card">
          <MatchupTable types={types} />
        </div>
        <div className="card topMargin">
          <h3>Stats</h3>
          <br></br>
          <table>
            <thead>
              <tr className="tableHead">
                <th>Height</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody className="blackBG">
              <tr>
                <td>{props.array.height}</td>
                <td>{props.array.weight}</td>
              </tr>
            </tbody>
          </table>
          <br></br>
          <div>
            {props.array.stats && (
              <Table
                data={props.array.stats}
                rowSelection={false}
                headerClassName="tableHead">
                <Column
                  title="Stat"
                  dataKey="stat.name"
                  width={150}
                  className="tableCell"
                  cellRenderer={(props) => props.cellData.toUpperCase()}
                />
                <Column
                  title="Base Value"
                  dataKey="base_stat"
                  width={100}
                  className="tableCell"
                />
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
