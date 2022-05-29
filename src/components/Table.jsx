import React from 'react'

const Table = ({data,datid,handledelete}) => {
  return (
    <tr>
        <td>{data.username}</td>
        <td>{data.userage}</td>
        <td>{data.address}</td>
        <td>{data.department}</td>
        <td>{data.salary}</td>
        <td>{data.MS? "yes":"no"}</td>
        <td><button onClick={()=>(
          handledelete(datid)
        )}>X</button></td>
    </tr>
  )
}

export default Table