import React, {useState,useEffect} from 'react'


export default function TextSearch(props) {
    const [array, updateArray] = useState([]);

    //Set Array after Initial Data Fetch of Full Array is Done
    useEffect(() => {
        const newArray = props.array;
        updateArray(newArray);
    }, [props.array]);

    // Filter the array when typed
    const filterArray = (e) => {
        const typed = e.target.value.toLowerCase();
        const resultArray = array.filter(item => item.name.toLowerCase().includes(typed) && 1)
        props.function(resultArray)

        //Special Rule to Reset Joint Use of ABC Filters
        if (props.resetABC) {
            props.abcStatus ? props.resetABC(false) : props.resetABC(true);
        }
    }

    return (
      <div>
        <input
          id="textField"
          className="topMargin"
          type="text"
          placeholder={props.label}
          style={{ width: "100%" }}
          onChange={(e) => filterArray(e)}></input>
      </div>
    );
}
