const { Router } = require("express")
require('dotenv').config();
const {User,Account}=require("../db/index")
const UserSchemaVal=require("../utils/userSchemaval");
const jwt=require("jsonwebtoken");
const router=Router();
const JWT_KEY=process.env.JWT_KEY;

const {userAuthMIddle}=require("../midllewire/userAuth")



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
        const account=await Account.create({
            userId:newuser._id,
            balance:605.000
        })
        const token=jwt.sign({
            userId:newuser._id
        },JWT_KEY)

        
        return res.status(200).json({msg:"User created successfully",token});

    }catch(err){

    }


})


router.post("/signin",async(req,res)=>{
    const{username,password}=req.body;
    try{
        const user=await User.findOne({
            username:username,
            password:password
        })
        if(!user){
            return res.status(400).json({msg:"User not found"});
        }
        
        const token=jwt.sign({
            userId:user._id
        },JWT_KEY);
        return res.status(200).json(`Bearer ${token}`)


    }catch(err){
        return res.status(500).json({msg:"Internal server error"});

    }
})


// route for updating the user imformation

router.post("/updateInfo", userAuthMIddle, async (req, res) => {
    const id = req.userId;
    const { username, password } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (username) user.username = username;
        if (password) user.password = password;

        await user.save();

        return res.status(200).json({ msg: "Data updated successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});


// route to get users from the backend filtered via fristname/lastname

router.get("/findAllUsers",async(req,res)=>{
    const query=req.query.filter || '';
    try{
        const users=await User.find({
            $or:[{
                firstname:{
                    "$regx":filter
                }
            },{
                lastname:{
                    "$regx":filter
                }
            }]
        })
        // ye advance code hai find karne ka based on firstname or the last name
        res.json({
            user:users.map(user => ({
                username:user.username,
                firstname:user.firstname,
                lastname:user.lastname,
                _id:user._id
            }))
        })

    }catch(err){
        res.status(500).json({msg:"Internal seerver error"});

    }
})




module.exports=router;