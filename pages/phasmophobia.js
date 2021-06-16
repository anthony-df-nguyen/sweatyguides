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
      <Page title="Phasmophobia">
        <div className="topMargin4">
          <h1>Objective Tracker</h1>
          <p>Click an objective to mark it as active</p>
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
        <div className="topMargin4">
          <h1>Ghost Finder</h1>
          <p>Pick up to 3 pieces of evidence to identify the ghost</p>
          <GhostFinder />
        </div>
        <div className="topMargin4">
          <h1>Maps</h1>
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
      </Page>
    </div>
  );
}
