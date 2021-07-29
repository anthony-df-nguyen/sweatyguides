import React from "react";
import Page from "components/Page.jsx";
import Expander from "components/Expander.jsx";
import Image from "next/image";
import FullScreen from "components/FullScreen.jsx";

export default function amongus() {
  return (
    <div>
      <Page
        headTitle="Sweaty Guides | Among Us"
        title="Among Us"
        background="https://image-cdn.essentiallysports.com/wp-content/uploads/20200913150337/93GAa4wm3z4HbenzLbxWeQ-1600x900.jpg">
        <Expander title="Skeld">
          <FullScreen>
            <Image
              src="/images/amongus/skeld.jpg"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </Expander>
        <Expander title="Mira HQ">
          <FullScreen>
            <Image
              src="/images/amongus/mira.png"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </Expander>
        <Expander title="Polus">
          <FullScreen>
            <Image
              src="/images/amongus/polus.png"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </Expander>
        <Expander title="Airship">
          <FullScreen>
            <Image
              src="/images/amongus/airship.jpg"
              layout="responsive"
              width="5"
              height="3"
            />
          </FullScreen>
        </Expander>
      </Page>
    </div>
  );
}
