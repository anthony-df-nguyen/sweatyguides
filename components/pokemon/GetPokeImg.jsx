import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "components/Loading";

export default function GetPokeImg(props) {

  return (
    <div
      style={{
        display: "block",
        margin: "0 auto",
        height: "8rem",
        width: "8rem",
      }}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
        height="1"
        width="1"
        layout="responsive"
        placeholder="/images/loading.svg"
      />
    </div>
  );
}
