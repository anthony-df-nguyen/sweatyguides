import React, {useState} from 'react'
import Image from "next/image";

export default function Fullscreen(props) {
    const [display,updateDisplay] = useState('none');
    const handleClick = () => {
        display === 'none' ? updateDisplay('block') : updateDisplay('none')
    }

    const fullSrc = props.children.props.src

    return (
      <div className="modalPreview" onClick={handleClick}>
        {props.children}
        <div id="fullModal" style={{ display: display }}>
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              fontSize: "1.5rem",
            }}>
            Click anywhere to close
          </div>
          <div className="image">
            <Image src={fullSrc} layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>
    );
}
