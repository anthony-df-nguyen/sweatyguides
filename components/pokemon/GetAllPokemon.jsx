import React, {useEffect} from 'react'

export default function GetAllPokemon(props) {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=2000";
    useEffect(()=> {
        const getData = async () => {
            console.log("Fetching the total list of pokemon")
            await fetch(url).then(res => res.json()).then(data => {
                const allPokemon = data.results;
                allPokemon.sort((a,b) => b.name < a.name ? 1 : -1)
                console.log("Updating the allList array/state")
                props.function(allPokemon)
            })
        }
        getData();
    },[])
    return (
        <div>
            
        </div>
    )
}
