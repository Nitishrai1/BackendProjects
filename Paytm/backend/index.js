const express=require("express");

const app=express();

const user=require("./routes/user")
const transaction=require("./routes/transaction")

app.use("/api/v1",user);
app.use("api/v1/transaction",transaction);









const PORT=3000;
app.listen(PORT || 3002,
    console.log("App is runnig")
)