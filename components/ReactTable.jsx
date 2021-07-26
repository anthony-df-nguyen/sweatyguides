import React, {useEffect, useState} from 'react';
import { Table, Column } from 'sticky-react-table';

export default function ReactTable(props) {
    const csvToJson = async () => {
        await fetch(props.data)
        .then(data => data.json())
        .then(lines => {
            console.log(lines);
            updateData(lines)
        })
    }

    const [data,updateData] = useState([])

    useEffect(()=> {
        csvToJson();
        return (()=> {

        })
    },[])
    return (
    <Table data={data} fixed="1" rowSelection={false} headerClassName="tableHead" >
        {props.head.map((row,i)=> {
            return <Column id={i} title={row.name} width={row.width + "px"} dataKey={row.name} className="tableCell" />
        })}
    
      </Table>
    )
}
