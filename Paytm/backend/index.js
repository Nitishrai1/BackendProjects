const express=require("express");
const cors=require('cors');
const app=express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
const JWT_KEY=process.env.JWT_KEY
const user=require("./routes/user")
const transaction=require("./routes/transaction")

app.use("/api/v1",user);
app.use("api/v1/transaction",transaction);









const PORT=3000;
app.listen(PORT || 3002,
    console.log("App is runnig")
)