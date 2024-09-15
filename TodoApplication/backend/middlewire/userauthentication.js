const User=require('../db');
const jwtkey="fuckoffhacker"
const jwt=require("jsonwebtoken");

const userauth=async function(req,res,next){
    const token=req.headers['authorization']?.split(' ')[1];
    if(token){
        const decode=jwt.verify(token,jwtkey)
        console.log(`decoded message is ${decode}`);
        const username=decode.userId;

    try{
        
        const userexist=await User.findOne({
            _id:username
        });
        if(!userexist){
            return res.status(411).json({msg:"User not exist"});
            
        }
        console.log(`Username id in the middlewire is ${username}`);
        req.userId=username;
        next();
    }catch(err){
        return res.status(500).json({msg:"Internal server error in middlewire"});
   }

    }


}

module.exports=userauth;