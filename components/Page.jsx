import React from "react";
import Head from "next/head";
import Navbar from "components/Navbar";
import { GoMarkGithub } from "react-icons/go";

export default function Page(props) {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      <Head>
        <title>{props.headTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          type="description"
          content="A small website for helpful gaming resources, tools, and guides"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"></link>
      </Head>

      <div
        className="pageBackground"
        style={{ backgroundImage: `url("${props.background}")` }}></div>
      <Navbar />
      <div className="pageContent">
        <div className="wrapper">
          <div className="pageTitle">{props.title}</div>
        </div>
        <div className="wrapper">{props.children}</div>
        <footer>
          <div
            style={{ margin: "0 auto", display: "block", textAlign: "center" }}>
            {" "}
            <a href="https://github.com/skifreetony/sweatyguides">
              {" "}
              <div>Want to contribute or report a bug? </div>
              <div className="centerText smallText">
                <div
                  style={{
                    display: "inline",
                    position: "relative",
                    top: "8px",
                    marginRight: "8px",
                  }}>
                  {" "}
                  <GoMarkGithub size="1.5rem" />
                </div>
                skifreetony
              </div>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
