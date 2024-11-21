const mongoose=require('mongoose');


mongoose.connect("mongodb://localhost:27017/paytmApp")
.then(()=>console.log(`mongodb connected succesfully`))
.catch((err)=>console.log(`error in connecting to database`))


const userSchema=new mongoose.Schema({
   username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    min:3,
    max:12,
   },
   password:{
    type:String,
    required:true,
    min:6
   },
   firstname:{
    type:String,
    lowercase:true,
    min:3,
    max:12,

   },
   lastname:{
    type:String,
    lowercase:true,
    min:3,
    max:12,

   }

})


const bankSchema=new mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
   },
   balance:{
      type:Number,
      required:true
   }
   
})
const Account=mongoose.model('Account',bankSchema);
const User=mongoose.model('User',userSchema)

module.exports={
   Account,
   User

};