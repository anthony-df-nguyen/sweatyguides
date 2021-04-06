import React from 'react';
import style from 'styles/Navbar.module.scss'
import Link from 'next/link'

export default function Navbar() {
    return (
      <div className={style.navbar}>
        <h1>
          {" "}
          <Link href="/">Sweaty Guides</Link>
        </h1>
      </div>
    );
}
