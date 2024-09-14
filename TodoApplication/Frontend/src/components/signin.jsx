



import { useState } from "react";

export  function Signinform(){

    const [name,setName]=useState("");
    const [password,setPassword]=useState("");



    return <div>
        <input style={{
            padding:10,
            margin:10
        }} type="text" placeholder="name" onChange={function(e){
            setName(e.target.value);
        }} /><br />
        <input  style={{
            padding:10,
            margin:10
        }}  type="password" placeholder="password" onChange={function(e){
            setPassword(e.target.value);
        }} /><br />

    </div>

}