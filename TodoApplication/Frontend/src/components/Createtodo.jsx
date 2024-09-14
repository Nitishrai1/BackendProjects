import { useState } from "react"

export function CreateTodo(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    return  <div>
        <input style={{
            padding:10,
            margin:10
        }} type="text" placeholder="Title" onChange={function(e){
            setTitle(e.target.value);
        }} /><br />
        <input  style={{
            padding:10,
            margin:10
        }}  type="text" placeholder="description" onChange={function(e){
            setDescription(e.target.value);
        }} /><br />

        <button  style={{
            padding:10,
            margin:10
        }} onClick={()=>{
        
            
        }}> Add a todo</button>

    </div>
}