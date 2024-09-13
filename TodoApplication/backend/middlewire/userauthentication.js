const User=require('../db');


const userauth=async function(req,res,next){
    const username=req.body.username;
    const password=req.body.password;

    console.log(username,password);
   try{
    // const user={
    //     username:username,
    //     password:password
    // }
    
    const userexist=await User.findOne({username,password});
    if(!userexist){
        return res.status(411).json({msg:"User not exist"});
        
    }
    next();
   }catch(err){
    return res.status(500).json({msg:"Internal server error in middlewire"});
   }



}

module.exports=userauth;