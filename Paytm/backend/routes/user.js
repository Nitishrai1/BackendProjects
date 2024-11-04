const { Router } = require("express")
require('dotenv').config();
const User=require("../db/index")
const UserSchemaVal=require("../utils/userSchemaval");
const jwt=require("jsonwebtoken");
const router=Router();
const JWT_KEY=process.env.JWT_KEY;

router.get();


router.post("/signup",async(req,res)=>{
    const {username,password,firstname,lastname}=req.body;
    const uservalidation=UserSchemaVal.safeParse({
        username,
        password,
        firstname,
        lastname
    })
    if(!uservalidation.success){
        return res.status(400).json({msg:"Enter correct details"});
    }
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

        const token=jwt.sign({
            userId:newuser._id
        },JWT_KEY)

        
        return res.status(200).json({msg:"User created successfully",token});

    }catch(err){

    }


})




module.exports=router;