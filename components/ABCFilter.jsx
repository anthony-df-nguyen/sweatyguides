import React, { useState, useEffect } from "react";

export default function ABCFilter(props) {
  const abc = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const [array, updateArray] = useState(props.array);
  const [active, updateActive] = useState(false);
  //console.log('array: ', array);
  useEffect(() => {
    const newData = props.array;
    updateArray(newData);
  }, [props.array]);

  const deactivate = () => {
    updateActive("");
  };

  const filterByLetter = (letter, i) => {
    //If it was already clicked
    if (i === active) {
      deactivate();
      //Set the List back to FullList
      props.function(props.array);
    }
    //Not clicked yet
    else {
      updateActive(i);
      let filteredArray = [];
      array.forEach((row) => {
        row.name.charAt(0) === letter && filteredArray.push(row);
      });
      props.function(filteredArray);
    }

    //Use props.scrollIntoViewDiv to have the page scroll to a div when clicking a letter
    if (props.scrollIntoViewDiv) {
      const divRef = `#${props.scrollIntoViewDiv}`;
      const scrollToDiv = document.querySelector(divRef);
      scrollToDiv.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    
    //If used in conjuction with text search, reset text search display when using ABC filter
    const search = document.querySelector("#textField");
    search && (search.value = "");
  };

  useEffect(() => {
    deactivate();
  }, [props.reset]);

  return (
    <div className="topMargin">
      <div className="flexRow">
        {abc.map((row, i) => (
          <div
            key={i}
            style={{ flexGrow: "0", fontWeight: active === i && "700" }}
            className={`hover centerText smallCard ${
              active === i && "yellow active"
            }`}
            onClick={(e) => filterByLetter(row, i)}>
            {row.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
