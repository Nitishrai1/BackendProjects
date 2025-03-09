import express from "express";
import {BACKEND_URL} from "@repo/common/config"

console.log(BACKEND_URL);
const app=express();

app.get("/",(req,res)=>{
    res.json({
        msg:"hello from backend"
    })
})

app.listen(3003,()=>{
    console.log("app is listing at port 3003")
})


