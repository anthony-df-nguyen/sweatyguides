import React from "react";
import Head from "next/head";
import Navbar from "components/Navbar";
export default function Page(props) {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      <Head>
        <title>{props.title}</title>
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
      <Navbar />
      <div className="wrapper">
        <div className="pageTitle">{props.title}</div>
      </div>
      <div className="wrapper">{props.children}</div>
    </div>
  );
}
