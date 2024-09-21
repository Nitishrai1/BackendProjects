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
        }} onClick={async()=>{
            console.log(localStorage.getItem('Token'));
            const token=localStorage.getItem('Token');
            await fetch("http://localhost:3000/user/todo",{
                method:'POST',
                headers:{
                    'authorization':token,
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify({
                    title:title,
                    description:description
                })
            })
        
            
        }}> Add a todo</button>

    </div>
}4