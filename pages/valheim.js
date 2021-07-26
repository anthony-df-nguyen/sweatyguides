import React, { useEffect, useState } from "react";
import Page from "components/Page.jsx";
import Expander from "components/Expander.jsx";
import ReactTable from "components/ReactTable";


export default function Valheim() {


  return (
    <div>
      <Page title="Valheim">
        <div className="card">
          <h1>Server Info</h1>
          <h3 style={{ color: 'white' }}>IP: 194.156.90.227:27082</h3>
        </div>

        <Expander title="How to Install Valheim+">
          <div><b>Full guide is available <a href="https://valheim.plus/installation" className='blue'>here</a></b></div>
          <br></br>         
          <ol>
            <li>Down the latest Valheim+ file <a href="https://valheim.plus/cdn/0.9.8.2/WindowsClient.tar.gz" className="blue">here</a></li>
            <li>If you don't have an unzipping program that can handle .tar/.gz files, download 7-zip <a href="https://www.7-zip.org/download.html" className="blue">here</a></li>
            <li>Unzip the downloaded file (if using 7-Zip, right click the zip file &gt; 7-Zip &gt;  Extract Files). After that, if you see a 'WindowsClient.tar' file, you need to also un-zip that. The final result of the unzipping should be multiple files/folders, which include: 'BepInEx, doorstop_libs, unstripped_corlib, doorstop_config,winhttp.dll'</li>
            <li>Locate your Valheim game folder. Shortcut, in Steam, right click Valheim on the game list and click 'Manage &gt; Browse Local Files</li>
            <li>Copy and paste the downloaded unzipped files from step 3 into the game folder and say 'Yes' to replacing any files. *Note: If you install valheim plus for the first time, you will have to start your game once to have the config file placed in your BepInEx\config directory.</li>
          </ol>
        </Expander>
        <Expander title="Current Server Valheim+ Settings">
          <div className="listSeparator">Building</div>
          <ul>
          <li>Wokbench radius increased to 30m from 20m</li>
            <li>
              CraftFromChest: When crafting something, it can pull from chests
              near you instead of requiring you to go get them (be careful not
              to build our bases too close)
            </li>
            <li>
              Automatically repair your equipment when you interact with the
              appropriate workbench
            </li>
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

          </ul>
          <div className="listSeparator">Inventory/Weight</div>
          <ul>
            <li>Base carry weight: 400 (from 300)</li>
            <li>Upgraded carry weight (from belt): 600 from (450)</li>
            <li>Increased player inventory by 2 more rows</li>
            <li>The Karve boat has increased inventory of 6 instead of 4</li>

          </ul>
          <div className="listSeparator">Effects/Buffs</div>
          <ul>
            <li>
              Increased comfort radius from 10 to 15 (get the comfort buff from
              items in your base without needing items as physically close)
            </li>
            <li>
              Food will last 25% longer - Share map progression (our map
              exploration progress syncs){" "}
            </li>
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
            <li>Can't kill other peoples tamed pets</li>
          </ul>

          <div className="listSeparator">Map/Exploration</div>
          <ul>
            <li>Option to share your markers</li>
            <li>View boats/carts on the map</li>
            <li>Player position always shown</li>
            <li>Increased map discovery radius to 250 from 100</li>
            <li>Added current in-game time</li>
          </ul>

        </Expander>

        <Expander title="Food Table">
          <h4>Click table headers to sort</h4>
          <br></br>
          <ReactTable data="/valheim/foods.json" head={[
            {
              name: 'Name',
              width: '200',
            },
            {
              name: 'Health',
              width: '100',
            },
            {
              name: 'Healing',
              width: '100',
            },
            {
              name: 'Stamina',
              width: '100',
            },
            {
              name: 'Duration',
              width: '100',
            },
            {
              name: 'Stack Size',
              width: '100',
            },
          ]} />
        </Expander>

      </Page>
    </div>
  );
}
