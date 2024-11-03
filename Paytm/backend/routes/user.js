const { Router } = require("express")
const User=require("../db/index")


const router=Router();


router.get();


router.post("/signup",async(req,res)=>{
    const {username,password,firstname,lastname}=req.body;
    try{
        const user=await User.findOne({
            username:username
        })
        if(user){
            res.status(404).json("User already exist");
            return;
        }
        const newuser=await User.create({
            username:username,
            password:password,
            firstname:firstname,
            lastname:lastname
        })
        newuser.save();
        return res.status(200).json({msg:"User created successfully"});

    }catch(err){

    }


})




module.exports=router;