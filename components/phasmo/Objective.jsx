import React,{useState} from 'react'
import style from "styles/phasmo/phasmo.module.scss"


export default function Objective(props) {

    const [activeClass,updateClass] = useState(style.objective)
    const handleClick = () => {
        if (activeClass === style.objective) {
            updateClass(style.objective + ' ' + style.active);
        } else {
            updateClass(style.objective)
        }
    }

    return (
        <div className={activeClass} onClick={handleClick}>
           {props.name}
        </div>
    )
}
