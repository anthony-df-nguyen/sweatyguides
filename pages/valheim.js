import React, { useEffect, useState } from 'react'
import Page from 'components/Page.jsx'
import Expander from 'components/Expander.jsx'
import Image from 'next/image'
import FullScreen from 'components/FullScreen.jsx'
import ReactTable from 'components/ReactTable'

export default function Valheim () {
  return (
    <div>
      <Page
        headTitle='Sweaty Guides | Valheim'
        title='Valheim'
        background='https://images3.alphacoders.com/113/thumb-1920-1131606.png'
      >
        <div className='card'>
          <h1>Server Info</h1>
          <h3 style={{ color: 'white' }}>
            IP: 194.156.90.227:27082
            <div>
              <a href='steam://run/892970/+connect194.156.90.227:27082/'>
                Launch Game and Join Server
              </a>{' '}
            
            </div>
          </h3>
        </div>
        <Expander title='Current Server Valheim+ Settings'>
          <div className='listSeparator'>Building/Workbench</div>
          <ul>
            <li>Wokbench radius increased to 30m from 20m</li>
            <li>Workbenches require no roof</li>
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
              building freedom/flexibility{' '}
            </li>
            <li>
              Increase object placement range from 8 to 16 (place items in build
              mode further without needing to walk)
            </li>
          </ul>
          <div className='listSeparator'>Smelting</div>
          <ul>
            <li>Smelter will automatically pull ores and coal from nearby chests within range of 5</li>
            <li>Kiln will automatically pull wood from nearby chests within range of 5. Will only use normal wood to make coal.</li>
            <li>Smelter can take 25 ore and 50 coal</li>
            <li>Smelter produces ingots in 10 seconds instead of 15</li>
            <li>Furnace can take 20 ore and 40 coal</li>
            <li>Furnace produces ingots in 20 seconds instead of 30</li>
            <li>Kiln can take 50 wood</li>
            <li>Kiln can produce coal in 10s instead of 15</li>
            <li>Iron obtained from mining doubled (1 to 2)</li>
          </ul>

          <div className='listSeparator'>Gathering/Farming</div>
          <ul>
            <li>
              Wood and core wood drop rate increased by 100%. Fine wood by 150%
            </li>

            <li>Beehive honey production quickened to 800 from 1200 seconds</li>
            <li>Using the cultivator no longer uses stamina</li>
            <li>Using the hoe no longer uses stamina</li>
          </ul>

          <div className='listSeparator'>Inventory/Weight</div>
          <ul>
            <li>Base carry weight: 400 (from 300)</li>
            <li>Upgraded carry weight (from belt): 600 from (450)</li>
            <li>Increased player inventory by 2 more rows</li>
            <li>The Karve boat has increased inventory of 6 instead of 4</li>
            <li>Longboat inventory increased to 32 slots</li>
            <li>The cart/wagon has 0 extra weight from items</li>
          </ul>
          <div className='listSeparator'>Effects/Buffs</div>
          <ul>
            <li>Jumping takes 100% less stamina</li>
            <li>Swimming takes 100% less stamina</li>
            <li>
              Increased comfort radius from 10 to 15 (get the comfort buff from
              items in your base without needing items as physically close)
            </li>
            <li>
              Each comfort level of your base adds 90 seconds to 'Well-rested'
              increased from 60 seconds
            </li>
            <li>
              Food degradation removed (you retain benefits from food all the
              way until it expires rather than decreasing over time)
            </li>
            <li>
              Food will last 25% longer - Share map progression (our map
              exploration progress syncs){' '}
            </li>

            <li>
              {' '}
              Disabled the animation when activating a guardian/boss ability
            </li>
            <li>
              Lowered cool-down of guardian/boss ability to 10 minutes instead
              of 20
            </li>
            <li>Can't kill other peoples tamed pets</li>
          </ul>

          <div className='listSeparator'>Map/Exploration</div>
          <ul>
            <li>Option to share your markers</li>
            <li>View boats/carts on the map</li>
            <li>Player position always shown</li>
            <li>Increased map discovery radius to 250 from 100</li>
            <li>Added current in-game time</li>
          </ul>
          <div className='listSeparator'>Camera</div>
          <ul>
            <li>
              Enabled 1st Person PoV (activate with F10). Use PageUp or PageDown
              to change the FOV
            </li>
          </ul>
        </Expander>
        <Expander title='How to Install Valheim+'>
          <div>
            <b>
              Full guide is available{' '}
              <a href='https://valheim.plus/installation' className='blue'>
                here
              </a>
            </b>
          </div>
          <br></br>
          <ol>
            <li>
              Down the latest Valheim+ file{' '}
              <a
                href='https://valheim.plus/cdn/0.9.8.2/WindowsClient.tar.gz'
                className='blue'
              >
                here
              </a>
            </li>
            <li>
              If you don't have an unzipping program that can handle .tar/.gz
              files, download 7-zip{' '}
              <a href='https://www.7-zip.org/download.html' className='blue'>
                here
              </a>
            </li>
            <li>
              Unzip the downloaded file (if using 7-Zip, right click the zip
              file &gt; 7-Zip &gt; Extract Files). After that, if you see a
              'WindowsClient.tar' file, you need to also un-zip that. The final
              result of the unzipping should be multiple files/folders, which
              include: 'BepInEx, doorstop_libs, unstripped_corlib,
              doorstop_config,winhttp.dll'
            </li>
            <li>
              Locate your Valheim game folder. Shortcut, in Steam, right click
              Valheim on the game list and click 'Manage &gt; Browse Local Files
            </li>
            <li>
              Copy and paste the downloaded unzipped files from step 3 into the
              game folder and say 'Yes' to replacing any files. *Note: If you
              install valheim plus for the first time, you will have to start
              your game once to have the config file placed in your
              BepInEx\config directory.
            </li>
          </ol>
        </Expander>
        <h1 className='topMargin4'>Map</h1>
        <p>
          {' '}
          Access the editable/collaborative map{' '}
          <a
            className='blue'
            href='https://valheim-map.world/?seed=H24gw74acK&ver=0.150.3&lob=g6AW5g&ekey=7fdfm8xB&offset=0%2C0&zoom=0.614&view=0'
          >
            here
          </a>
        </p>
        <Expander title='Server Map'>
          <FullScreen>
            <Image
              src='/images/valheim/map.png'
              layout='responsive'
              width='5'
              height='5'
            />
          </FullScreen>
        </Expander>
        <h1 className='topMargin4'>Reference Tables</h1>
        <p>
          Click table header names to sort table rows. Click blue text to view
          detailed wiki page.
        </p>
        <Expander title='Food Stats'>
          <ReactTable
            data='/valheim/foods.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '300'
              },
              {
                name: 'Health',
                width: '100'
              },
              {
                name: 'Healing',
                width: '100'
              },
              {
                name: 'Stamina',
                width: '100'
              },
              {
                name: 'Duration',
                width: '100'
              },
              {
                name: 'Stack Size',
                width: '100'
              }
            ]}
          />
        </Expander>
        <Expander title='Meads'>
          {' '}
          <ReactTable
            data='/valheim/mead.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '200'
              },
              {
                name: 'Type',
                width: '100'
              },
              {
                name: 'Detail',
                width: '400'
              },
              {
                name: 'Base Ingredients',
                width: '200'
              },
              {
                name: 'Duration',
                width: '75'
              }
            ]}
          />
        </Expander>
        <Expander title='Creatures/Mobs'>
          <ReactTable
            data='/valheim/creatures.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '150'
              },
              {
                name: 'Spawn',
                width: '100'
              },
              {
                name: 'HP',
                width: '70'
              },
              {
                name: 'Max Dmg',
                width: '100'
              },
              {
                name: 'Notes',
                width: '200'
              },
              {
                name: 'Weakness',
                width: '100'
              },
              {
                name: 'Resistance',
                width: '100'
              },
              {
                name: 'Immune',
                width: '100'
              }
            ]}
          />
        </Expander>
        <Expander title='Weapon Stats'>
          <ReactTable
            data='/valheim/weapons.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '175'
              },
              {
                name: 'Type',
                width: '100'
              },
              {
                name: 'Dmg',
                width: '70'
              },
              {
                name: 'Max Upgraded Dmg',
                width: '120'
              },
              {
                name: 'Dmg Type',
                width: '170'
              },
              {
                name: 'Backstab',
                width: '70'
              },
              {
                name: 'Knockback',
                width: '70'
              }
            ]}
          />
        </Expander>
        <Expander title='Bows/Arrows'>
          <h2 style={{textAlign:'left'}}>Bows</h2>
          <ReactTable
            data='/valheim/bows.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '200'
              },
              {
                name: 'Type',
                width: '100'
              },
              {
                name: 'Dmg',
                width: '100'
              },
              {
                name: 'Dmg Type',
                width: '150'
              },
              {
                name: 'Backstab',
                width: '100'
              },
              {
                name: 'Knockback',
                width: '100'
              }
            ]}
          />
          <h2 className="topMargin" style={{textAlign:'left'}}>Arrows</h2>
           <ReactTable
            data='/valheim/arrows.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '200'
              },
              {
                name: 'Type',
                width: '100'
              },
              {
                name: 'Dmg',
                width: '100'
              },
              {
                name: 'Dmg Type',
                width: '150'
              },
              {
                name: 'Knockback',
                width: '100'
              }
            ]}
          />
        </Expander>
        <Expander title='Shields'>
          <ReactTable
            data='/valheim/shields.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '200'
              },
              {
                name: 'Type',
                width: '100'
              },
              {
                name: 'Block Power | Upgraded Max',
                width: '150'
              },
              {
                name: 'Parry Force | Upgraded Max',
                width: '150'
              },
              {
                name: 'Parry Bonus',
                width: '100'
              }
            ]}
          />
        </Expander>
        <Expander title='Armor Stats'>
          <ReactTable
            data='/valheim/armor.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '175'
              },
              {
                name: 'Type',
                width: '75'
              },
              {
                name: 'Quality Level 1 | 2 | 3 | 4',
                width: '200'
              },
              {
                name: 'Crafting Materials Level 1 | 2 | 3 | 4',
                width: '275'
              },
              {
                name: 'Movement',
                width: '100'
              },
              {
                name: 'Weight',
                width: '50'
              }
            ]}
          />
        </Expander>
        <Expander title='Materials | Metals | Food | Misc'>
          <ReactTable
            data='/valheim/materials.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '175'
              },
              {
                name: 'Type',
                width: '100'
              },
              {
                name: 'Source',
                width: '600'
              }
            ]}
          />
        </Expander>
        <Expander title='Effects | Buffs'>
          <ReactTable
            data='/valheim/effects.json'
            external='https://valheim.fandom.com/wiki/'
            head={[
              {
                name: 'Name',
                width: '150'
              },
              {
                name: 'Source',
                width: '150'
              },
              {
                name: 'Effects',
                width: '300'
              },
              {
                name: 'Notes',
                width: '300'
              }
            ]}
          />
        </Expander>

        <div className='card topMargin4'>
          <h1>Twitter</h1>
          <div className='twitter topMargin'>
            <a
              class='twitter-timeline'
              data-lang='en'
              data-theme='dark'
              href='https://twitter.com/Valheimgame?ref_src=twsrc%5Etfw'
            >
              Tweets by Valheimgame
            </a>{' '}
            <script
              async
              src='https://platform.twitter.com/widgets.js'
              charset='utf-8'
            ></script>
          </div>
        </div>
      </Page>
    </div>
  )
}
