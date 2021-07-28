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

    const clearSearch = () => {
        const search = document.querySelector("#textField")
        search.value = '';
        props.function(props.array)
    }


    return (
        <div>
            <input id="textField" className="topMargin" type="text" placeholder={props.label} style={{width:"80%",}} onChange={(e)=> filterArray(e)}></input>
            <button onClick={()=> clearSearch()} className="yellowBG" style={{marginLeft:"10px",width:"calc(20% - 10px)",}}  >Clear</button>
        </div>
    )
}
