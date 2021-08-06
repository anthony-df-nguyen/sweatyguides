import React from 'react'
import { capitalize, split } from "lodash";

export default function CleanStrings(props) {
    // This component takes a string and uses lodash to do formal uppercasing of words and will clean a given character
    return <div>{split(props.string,props.replace,props.maxArray).map((row,i) => {
        if (i > 0 && !props.parenthesis) {
            return ` ${capitalize(row)}`
        } else if (i > 0 && props.parenthesis) {
            return ` (${capitalize(row)})`;
        } else {
          return capitalize(row);
        }
    })}</div>;
}
