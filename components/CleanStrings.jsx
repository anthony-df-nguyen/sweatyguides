import React,{useState} from 'react'
import { capitalize, split } from "lodash";

export default function CleanStrings(props) {
    // This component takes a string and uses lodash to do formal uppercasing of words and will clean a given character

    const [position,updatePosition] = useState(props.position ? props.position : "block")
    

    return (
      <div style={{ display: position }}>
        {split(props.string, props.replace, props.maxArray).map((row, i) => {
          if (i > 0 && !props.parenthesis) {
            return ` ${capitalize(row)}`;
          } else if (i > 0 && props.parenthesis) {
            return ` (${capitalize(row)})`;
          } else {
            return capitalize(row);
          }
        })}
      </div>
    );
}
