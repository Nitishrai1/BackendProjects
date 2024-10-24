const express=require("express");
// import { express } from "express";
const userroute=require("./routes/user")
const app=express();
const dataroute=require("./routes/Data")
require('dotenv').config()

const cors=require('cors');  //cors is liye use hota hai taki jab bhi hamara backend or frontend alag alag locala host par chal raha hota hai to hamara browser allow nahi karta hai dusare local host wale frontend ko dusrare local host ke backend ho hit kare ki permision nahi deta hai cors help karta hai taki wo waysa kar sake with  the help off orogin se kar ke or agar hamko sabko allow karna haio tab empty rakh dena

app.use(cors())

// midle wire
app.use(express.json());
app.use("/user",userroute);
app.use("/user/Search",dataroute)

const PORT=3000;
app.listen(3000,function(){
    console.log(`App is listing on port number ${PORT}`);
})