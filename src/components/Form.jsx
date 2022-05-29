import React,{ useEffect, useRef, useState }  from 'react'
import axios from 'axios';
import Table from './Table';
import s from './Form.module.css'


const Form = () => {
  
const [dat,setadata]=useState({check:false});
const [sort,setSort]=useState('');
const [page,setPage]=useState(1);
const [empty,setemp]=useState([]);
const [total,setTotal]=useState(0);
const submit=(e)=>
{
  e.preventDefault();
  axios.post('http://localhost:3111/form',dat)
  .then((r)=>{
    setemp([...empty,r.data]);
  })
}
useEffect(()=>
{
  axios.get(`http://localhost:3111/form?_sort=salary&_order=${sort}&_page=${page}&_limit=5`)
  .then((r)=>{
     setemp(r.data);
     setTotal(r.headers["x-total-count"])
  });
},[sort,page])
const handelchange=(e)=>
{
  let {name,value,type,checked}=e.target;
  if(type==="checkbox")
  {
    setadata({...dat,[name]:checked});
  }
  else{
    setadata({...dat,[name]:value})
  }
}

const handledelete=(datid)=>
{
  console.log(datid);
  let newTasks = empty.filter((task) => task.id!==datid);
    
    setemp(newTasks);
    setadata(empty);

}
  return (
    <>
      <form action="" onSubmit={submit} >
        <div className={s.form}>
          <h3>Form</h3>
         <input  className={s.input} name='username' value={dat.username} placeholder="Enter Name"   type="text" onChange={handelchange} />
         <input  className={s.input} name='userage' value={dat.userage} placeholder="Enter Age" type="number" onChange={handelchange} />
         <input  className={s.input} name='address' value={dat.address} placeholder="Address" type="text" onChange={handelchange} />
         <select className={s.ss} name="department" value={dat.deparment}  onChange={handelchange} >
          <option style={{backgroundColor:'darkblue'}} value="">Select Department</option>
          <option style={{backgroundColor:'darkblue'}} value="Front End">Front End</option>
          <option style={{backgroundColor:'darkblue'}} value="Back End">Back End</option>
          <option style={{backgroundColor:'darkblue'}} value="Full Stack">Full Stack</option>
        </select>
        <input name='salary' className={s.input} value={dat.salary} placeholder="Enter Salary" type="number" onChange={handelchange} />
        <label htmlFor=""><input name='MS' checked={dat.che}  type="checkbox" onChange={handelchange} />   Material status</label>
        
        <input type="submit" />
        </div>
      </form>

      
<div className={s.data}>
<select name="" id="" onChange={(e)=>setSort(e.target.value)}>
        <option value="">Sort Salary</option>
        <option value="asc">High to Low</option>
        <option value="desc">Low to high</option>
      </select>
<table >
     <thead>
       <tr>
         <th>Name</th>
         <th>Age</th>
         <th>Address</th>
         <th>Department</th>
         <th>Salary</th>
         <th>Marital state</th>
         <th>Delete</th>
       </tr>
     </thead>
     <tbody>
       {
           empty.map((el)=>(
             <Table key={el.id} datid={el.id} data={el} handledelete={handledelete}/>
           ))
       }
     </tbody>
   </table>
</div>
   <button disabled={page<1} onClick={()=>setPage((prev)=>prev-1)}>{'<'}</button>
   <button disabled={total<page*5} onClick={()=>setPage((prev)=>prev+1)}>{'>'}</button>
    </>
  )
}

export default Form