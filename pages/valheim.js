import React, {useEffect,useState} from "react";
import Page from "components/Page.jsx";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Expander from "components/Expander.jsx";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import fetch from "node-fetch";

export default function Valheim() {
    const [tableHeader,updateHeader] = useState([])
    const [tableRows,updateTableRows] = useState([])

    useEffect(() => {
        const getData = async () => {
            await fetch("/valheim/foods.csv")
            .then((res) => res.text()).
            then(text => {
              const rows = text.split("\n");
              console.log(rows);
              //Make Header
              const header = rows[0].split(",");
              console.log("header: ", header);
              updateHeader([...header]);
              //Make Rows
              let trows = []
              for (let i = 1;i < rows.length; i++) {
                  const data = rows[i].split(",")
                  trows.push(data)
              }
              updateTableRows([...trows])
            })
        }
                getData();
        return () => {
            
        }

    }, [])

  return (
    <div>
      <Page title="Valheim">
        <div className="card">
          <h1>Server Info</h1>
          <h3 style={{color:'white'}}>IP: 194.156.90.227:27082</h3>
        </div>

        <Expander title="Valheim+ Settings">
          <ul>
            <li>
              Advanced build and edit mods (learn how to use these here
              https://valheim.plus/documentation)
            </li>
            <li>
              Remove 'Invalid Placement' error when building to allow more
              building freedom/flexibility{" "}
            </li>
            <li>
              Increase object placement range from 8 to 12 (place items in build
              mode further without needing to walk)
            </li>
            <li>
              Increased comfort radius from 10 to 15 (get the comfort buff from
              items in your base without needing items as physically close)
            </li>
            <li>
              Food will last 25% longer - Share map progression (our map
              exploration progress syncs){" "}
            </li>
            <li>Option to share your markers</li>
            <li>View boats/carts on the map</li>
            <li>Player position always shown</li>
            <li>Base carry weight: 400 (from 300)</li>
            <li>Upgraded carry weight (from belt): 600 from (450)</li>
            <li>
              Each comfort level of your base adds 90 seconds to 'Well-rested'
              increased from 60 seconds
            </li>
            <li>
              {" "}
              Disabled the animation when activating a guardian/boss ability
            </li>
            <li>
              Lowered cool-down of guardian/boss ability to 10 minutes instead
              of 20
            </li>
            <li>
              Automatically repair your equipment when you interact with the
              appropriate workbench
            </li>
            <li>Increased player inventory by 2 more rows</li>
            <li>
              CraftFromChest: When crafting someething, it can pull from chests
              near you instead of requiring you to go get them (be careful not
              to build our bases too close)
            </li>
            <li>Added current in-game time</li>
            <li>Wokbench radius increased to 30m from 20m</li>
            <li>Can't kill other peoples tamed pets</li>
            <li>the Karve boat has increased inventory of 6 instead of 4</li>
          </ul>
        </Expander>

        <Expander title="Food Table">
          <Table>
            <Thead>
              <Tr>
                {tableHeader.map((row, i) => {
                  return <Th key={i}>{row}</Th>;
                })}
              </Tr>
            </Thead>
            <Tbody>
              {tableRows.map((row, i) => {
                return (
                  <Tr key={i}>
                    {row.map((data, z) => (
                      <Td key={z}>{data}</Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Expander>
      </Page>
    </div>
  );
}
