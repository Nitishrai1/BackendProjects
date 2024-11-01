const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/paytmApp")
.then(()=>console.log(`mongodb connected succesfully`))
.catch((err)=>console.log(`error in connecting to database`))


const userSchema={
    username:String
}