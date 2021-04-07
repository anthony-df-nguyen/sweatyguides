import React, { useState } from "react";
import style from "styles/ImageExpander.module.scss";
import { MdExpandMore, MdChevronRight } from "react-icons/md";

export default function Expander(props) {
  const [height, updateHeight] = useState("0px");
  const [openOrClose, updateOpenOrClose] = useState("closed");
  const [icon, updateIcon] = useState(<MdChevronRight />);

  const container = {
    maxHeight: height,
  };

  const handleClick = (e) => {
    if (openOrClose === "closed") {
      const maxH = e.target.nextSibling.scrollHeight;
      updateHeight(maxH + "px");
      updateOpenOrClose("opened");
      updateIcon(<MdExpandMore />);
    } else {
      updateHeight("0px");
      updateOpenOrClose("closed");
      updateIcon(<MdChevronRight />);
    }
  };
  const image = {
      backgroundImage: `url(${props.img})`,
  }

  console.log(props.img);
  return (
    <div className={style.expander}>
      <div className={style.title} style={image} onClick={handleClick}>
        <div className={style.textblock}>
          <div className={style.icon}>{icon}</div>
          {props.title}
        </div>
      </div>
      <div
        className={style.container}
        style={{ maxHeight: height }}
        id="container">
        <div className={style.content}>{props.children}</div>
      </div>
    </div>
  );
}
