

const jwt=require("jsonwebtoken");
const router = require("../routes/user");
const JWT_KEY=process.env.JWT_KEY;
require('dotenv').config

const userAuthMIddle=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token || !token.startswith('Bearer ')){
        return res.status(403).json({msg:"invalid user"});

    }
    const finalString=token.split(' ')[1];
    try{
        const decoded=jwt.verify(token,JWT_KEY);
        req.userId=decoded.userId;
        next();
    }catch(err){
        return res.status(403).json({});
    }
};


module.exports={
    userAuthMIddle
}

