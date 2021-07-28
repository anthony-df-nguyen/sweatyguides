import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function GetTypeIcon (props) {

  const findIcon = () => {
    const search = props.type;
    return `/images/pokedex/icons/${search}.svg`
  }

  return (
    <div
      style={{
        display: 'block',
        margin: '1rem auto 1rem auto',
        width: '3rem',
        height: '3rem'
      }}
    >
      <Image
        src={findIcon()}
        height='1'
        width='1'
        layout='responsive'
      />
    </div>
  )
}
