import React, { useEffect, useState } from "react";
import { Table, Column } from "sticky-react-table";

export default function ReactTable(props) {
  const url = props.external;
  const csvToJson = async () => {
    await fetch(props.data)
      .then((data) => data.json())
      .then((lines) => {
        //Sort by ABC by Default
        lines.sort((a, b) => (a.Name > b.Name ? 1 : -1));
        updateData(lines);
      });
  };

  const [data, updateData] = useState([]);

  useEffect(() => {
    csvToJson();
    return () => {};
  }, []);
  return (
    <Table
      data={data}
      fixed={1}
      rowSelection={false}
      headerClassName="tableHead">
      {props.head.map((row, i) => {
        if (i === 0 && props.external) {
          return (
            <Column
              key={i}
              title={row.name}
              width={row.width + "px"}
              dataKey={row.name}
              className="tableCell"
              cellRenderer={(props) => {
                const wiki = url + props.cellData;
                return <a className="blue" href={wiki} target="_blank" noreferrer="true">{props.cellData}</a>;
              }}
            />
          );
        } else {
          return (
            <Column
              key={i}
              title={row.name}
              width={row.width + "px"}
              dataKey={row.name}
              className="tableCell"
              cellRenderer={(props) => {
                return Array.isArray(props.cellData) ? (
                  <>
                    <ul>
                      {props.cellData.map((line, num) => (
                        <li className="noMargin" key={num}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  props.cellData
                );
              }}
            />
          );
        }
      })}
    </Table>
  );
}
