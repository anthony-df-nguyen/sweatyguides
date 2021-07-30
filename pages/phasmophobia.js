import React from "react";
import Page from "components/Page.jsx";
import Expander from "components/Expander.jsx";
import Image from "next/image";
import FullScreen from "components/FullScreen.jsx";
import GhostFinder from "components/phasmo/Ghostfinder";
import Objective from "components/phasmo/Objective"
import style from "styles/phasmo/phasmo.module.scss"

export default function phasmophobia() {
  return (
    <div>
      <Page
        headTitle="Sweaty Guides | Phasmophobia"
        title="Phasmophobia"
        background="https://roadtovrlive-5ea0.kxcdn.com/wp-content/uploads/2020/10/plasmophobia-5-1021x580.jpg">
        <Expander title="Objective Tracker">
          <div className="">
            <h3>Click an objective to mark it as active</h3>
            <div className="flexRow topMargin">
              <Objective name="Ghost Event" />
              <Objective name="Ghost Photo" />
              <Objective name="Prevent hunt with crucifix" />
              <Objective name="EMF Evidence" />
              <Objective name="Escape ghost while being hunted" />
              {/* <Objective name="Temps Below 10C" /> */}
              <Objective name="Motion Sensor" />
              <Objective name="Cleanse area with Smudge Sticks" />
              <Objective name="Ghost Walk in Salt" />
              <Objective name="Ghost blow out candle" />
              <Objective name="No deaths" />
              <Objective name="Use smudge sticks while hunted" />
              <Objective name="Average sanity below 25%" />
            </div>
          </div>
          <form className={style.objectiveForm}>
            <input type="text" placeholder="Name of Ghost" />
            <div className="topMargin">
              <p style={{ display: "inline" }}>Ghost responds to &nbsp;</p>
              <input id="everyone" type="checkbox"></input>
              <label htmlFor="everyone"> &nbsp;Everyone &nbsp;</label>
              <input id="alone" type="checkbox"></input>
              <label htmlFor="alone"> &nbsp;People Alone &nbsp;</label>
            </div>
          </form>
        </Expander>
        <Expander title="Maps">
          <div className="">
            <Expander title="Asylum">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/asylum.jpg"
                  layout="responsive"
                  width="5"
                  height="3"
                />
              </FullScreen>
            </Expander>
            <Expander title="Bleasdale Farmhouse">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/bleasdale.jpg"
                  layout="responsive"
                  width="5"
                  height="4"
                />
              </FullScreen>
            </Expander>
            <Expander title="Brownstone Highschool">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/highschool.jpg"
                  layout="responsive"
                  width="5"
                  height="2"
                />
              </FullScreen>
            </Expander>
            <Expander title="Edgefield Street House">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/edgefield.jpg"
                  layout="responsive"
                  width="5"
                  height="4"
                />
              </FullScreen>
            </Expander>
            <Expander title="Grafton Farmhouse">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/grafton.jpg"
                  layout="responsive"
                  width="4"
                  height="5"
                />
              </FullScreen>
            </Expander>
            <Expander title="Prison">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/prison.jpg"
                  layout="responsive"
                  width="5"
                  height="3"
                />
              </FullScreen>
            </Expander>
            <Expander title="Ridgeview Road House">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/ridgeview.jpg"
                  layout="responsive"
                  width="5"
                  height="4"
                />
              </FullScreen>
            </Expander>
            <Expander title="Tanglewood">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/tanglewood.jpg"
                  layout="responsive"
                  width="4"
                  height="4"
                />
              </FullScreen>
            </Expander>
            <Expander title="Willow Street House">
              <FullScreen>
                <Image
                  src="/images/phasmophobia/willow.jpg"
                  layout="responsive"
                  width="3"
                  height="2"
                />
              </FullScreen>
            </Expander>
            Maps by{" "}
            <a
              href="https://steamcommunity.com/sharedfiles/filedetails/?id=2251267947"
              target="_blank">
              Tom Maverick
            </a>
          </div>
        </Expander>

        <div className="topMargin4">
          <h1>Ghost Finder</h1>
          <p>Pick up to 3 pieces of evidence to identify the ghost</p>
          <GhostFinder />
        </div>
        <div className="card topMargin4">
          <h1>Twitter</h1>
          <div className="twitter topMargin">
            <a
              class="twitter-timeline"
              data-lang="en"
              data-theme="dark"
              href="https://twitter.com/KineticGame?ref_src=twsrc%5Etfw">
              Tweets by KineticGame
            </a>{" "}
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"></script>
          </div>
        </div>
      </Page>
    </div>
  );
}
