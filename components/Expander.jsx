import React,{useState} from 'react'
import style from 'styles/Expander.module.scss'
import { MdExpandMore, MdChevronRight } from "react-icons/md";

export default function Expander(props) {
    const [height, updateHeight] = useState(
      props.default ? "100%" : "0px"
    );
    const [openOrClose, updateOpenOrClose] = useState(
      props.default ? "opened" : "closed"
    );
    const [icon, updateIcon] = useState(
      props.default ? (
        <MdExpandMore fill="#f2a365" />
      ) : (
        <MdChevronRight fill="#009ddb" />
      )
    );
 
    const container = {
      maxHeight: height,
    };

 
    const handleClick = (e) => {
        if (openOrClose === 'closed') {
            //const maxH = e.target.nextSibling.scrollHeight;
            const maxH = '100%'
            updateHeight(maxH);
            updateOpenOrClose('opened');
            updateIcon(<MdExpandMore fill="#f2a365" />);
        } else {
             updateHeight('0px');
             updateOpenOrClose('closed')
               updateIcon(<MdChevronRight fill="#009ddb" />);
        }
    }

    return (
      <div className={style.expander + ` ${props.bg ? props.bg : ""}`}>
        <div className="title" onClick={handleClick}>
          <div className={style.icon}>{icon}</div>
          {props.title}
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
