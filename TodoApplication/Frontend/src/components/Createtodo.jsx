import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Todos from "./Todos";
export default function CreateTodo(){
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const comback=()=>{
        navigate("/Todos")
    }
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
            console.log(localStorage.getItem('token'));
            const token=localStorage.getItem('token');
           const response= await fetch("http://localhost:3000/user/todo",{
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
            const data=await response.json();
            alert(`The backend response is ${data.msg}`)
            
        }}> Add a todo</button>
        <button onClick={comback}>Go back</button>

    </div>
    
}