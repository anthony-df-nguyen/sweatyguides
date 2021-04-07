import React from "react";
import Page from "components/Page.jsx";
import ImageExpander from "components/ImageExpander.jsx";
import Image from "next/image";
import FullScreen from "components/FullScreen.jsx";

export default function valorant() {
  return (
    <div>
      <Page title="Valorant">
        <p>Click each map for full-screen view</p>
        <ImageExpander title="Ascent" img="/images/valorant/ascent.jpeg">
          <FullScreen>
            <Image
              src="/images/valorant/maps/ascent.svg"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </ImageExpander>
        <ImageExpander title="Bind" img="/images/valorant/bind.png">
          <FullScreen>
            <Image
              src="/images/valorant/maps/bind.svg"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </ImageExpander>
        <ImageExpander title="Haven" img="/images/valorant/haven.jpeg">
          <FullScreen>
            <Image
              src="/images/valorant/maps/haven.svg"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </ImageExpander>
        <ImageExpander title="Icebox" img="/images/valorant/icebox.png">
          <FullScreen>
            <Image
              src="/images/valorant/maps/icebox.svg"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </ImageExpander>
        <ImageExpander title="Split" img="/images/valorant/split.jpeg">
          <FullScreen>
            <Image
              src="/images/valorant/maps/split.svg"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </ImageExpander>
      </Page>
    </div>
  );
}
