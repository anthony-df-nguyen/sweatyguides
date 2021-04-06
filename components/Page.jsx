import React from 'react'
import Head from "next/head"
import Navbar from "components/Navbar"
export default function Page(props) {
    return (
      <div style={{paddingBottom:'4rem'}}>
        <Head>
          <title>{props.title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Navbar />
        <div className="wrapper">
          <div className='pageTitle'>{props.title}</div>
        </div>
        <div className="wrapper">{props.children}</div>
      </div>
    );
}
