const express=require("express");
const userroute=require("./routes/user")
const app=express();

// midle wire
app.use(express.json());
app.use("/user",userroute);



const PORT=3000;
app.listen(3000,function(){
    
    console.log(`App is listing on port number ${PORT}`);
})