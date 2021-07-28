import React, {useState,useEffect} from "react";
import Image from "next/image";
import { Table, Column } from "sticky-react-table";

export default function PokeModal(props) {

  return (
    <div className="fullPageBG center">
      <div className="modalContent center">  
        <button className="closeButton redBG" onClick={() => props.function("none")}>
          Close
        </button>
        <br></br>
        <div className="card">
          <div>
            <h3> {props.array.name && props.array.name.toUpperCase()}</h3>
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
                  height="2"
                  width="2"
                  layout="responsive"
                />
              )}
            </div>
          </div>
        </div>
        <br></br>
        <div className="flexRow">
          <div className="card">
            <div>
              <h3>Type</h3>
              <br></br>
              {props.array.types &&
                props.array.types.map((row, i) => {
                  return <p key={i}>{row.type.name.toUpperCase()}</p>;
                })}
            </div>
          </div>
          <div className="card">
            <h3>Stats</h3>
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
    </div>
  );
}
