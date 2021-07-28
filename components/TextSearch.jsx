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
    }


    return (
        <div>
            <input className="topMargin" type="text" placeholder={props.label} style={{width:"100%",}} onChange={(e)=> filterArray(e)}></input>
        </div>
    )
}
