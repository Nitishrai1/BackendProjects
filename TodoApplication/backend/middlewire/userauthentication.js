const User=require('../db');
const jwtkey="fuckoffhacker"
const jwt=require("jsonwebtoken");

const userauth=async function(req,res,next){
    const token=req.headers.authorization;
    const decode=jwt.verify(token,jwtkey)
   
    const username=decode.userId;
    
    console.log(username);
   try{
    // const user={
    //     username:username,
    //     password:password
    // }
    
    const userexist=await User.findOne({
        _id:username
    });
    if(!userexist){
        return res.status(411).json({msg:"User not exist"});
        
    }
    req.userId=username;
    next();
   }catch(err){
    return res.status(500).json({msg:"Internal server error in middlewire"});
   }



}

module.exports=userauth;