const express=require("express");
const cors=require('cors');
const app=express();
require('dotenv').config();
const JWT_KEY=process.env.JWT_KEY 

app.use(cors());
app.use(express.json());
const user=require("./routes/user")
const transaction=require("./routes/transaction")

app.use("/user",user);
app.use("/account",transaction);









const PORT=3000;
app.listen(PORT || 3002,
    console.log("App is runnig")
)