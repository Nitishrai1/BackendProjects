const User=require('../db');
const jwtkey = "fuckoffhacker";
const jwt=require("jsonwebtoken");

const userauth=async function(req,res,next){
    const token=req.headers.authorization;
    console.log(`token in the middle wire is ${token}`);
    if(!token){
        return res.status(401).json({msg:"Token not provided"});
    }
    
    try{
        const decode=jwt.verify(token,jwtkey); //ise user ki id nikal jayega jo ham req.userID me kar ke pass kar denge taki dusara middlewire usko use kar sake
        console.log(`decoded message is ${JSON.stringify(decode)}`);
        const username=decode.userId;

        
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

    };




module.exports=userauth;