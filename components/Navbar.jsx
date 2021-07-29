import React from "react";
import style from "styles/Navbar.module.scss";
import Link from "next/link";
import { IoGameController } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className={style.navbar}>
      <h1>
        {" "}
        <Link href="/">
          <div>
            <div className={style.text}>
              S<span style={{ fontWeight: "300" }}>weaty</span>
            </div>
            <div className={style.icon}>
              <IoGameController fill="#009ddb" />
            </div>
            <div className={style.text}>
              G<span style={{ fontWeight: "300" }}>uides</span>
            </div>
          </div>
        </Link>
      </h1>
    </div>
  );
}
