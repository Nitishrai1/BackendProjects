
const {Router}=require("express");
const User=require('../db')
const userauth=require("../middlewire/userauthentication")
const router=Router();

const {createTodo , updateTodo}=require('../utils');



router.post("/signup",async function(req,res){
    // create a new user

    const {username,password}=req.body;

    try{
        const user=await User.findOne({username,password});
        if(user){
           return res.status(411).json({msg:"User already exist"});
        }
        const newuser=await User.create({
            username:username,
            password:password,
            todos:[]
        });
        res.json({msg:"New user created successfully",newuser})
    }catch(err){
        console.log(err);
        res.json({msg:"internal server error"});
    }
})
router.get("/todos",async function(req,res){
        const {username,password}=req.body;

        try{
            const user=await User.findOne({username,password});
            if(!user){
                return res.send(400).json({msg:"User does not exist"});
               
            }
            const todos=user.todos;
           
            return res.send(200).json({msg:"Data fetch successfully",todos});
        }catch(err){
            console.log(err);
            res.json({msg:"Error in fetching the data"});
        }
})

router.post("/todo",userauth,async function(req,res){

    const {username,password,title,description,completed}=req.body;

    const newtodo=createTodo.safeParse({
        title,
        description,
        completed
    });
    if(!newtodo.success){
       return  res.status(411).json({msg:"not valid todo"})
       
    }
    // /sava int the database
   try{
        const user=await User.findOne({username,password});
        if(!user){
            return res.status(410).json({msg:"No user found"});
        }
        user.todos.push({title,description,completed});
        await user.save();
        return res.status(200).json({msg:"Todo update succesfully"});
       

   }catch(err){

       return res.status(400).json({msg:"Internal server error in todo",err});
   }
    

})    



router.put("/completed/:id",userauth,async function(req,res){

    const {id}=req.params;
    // ye to simple hai yek todo ki id milegai usko delete parna hai bass
    const {username,password}=req.body;

    const response=updateTodo.safeParse({id});
    if(!response.success){
        return res.send(411).json({msg:"You send the wrong id"})
    }

    try{
        
        const user=await User.findOne({username,password});
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }
        const todo=user.todos.id(id);
        if(!todo){
            return res.status(404).json({msg:"Todo not found"});
        }
        todo.completed=true;
        await user.save();
        
        return res.status(200).json({msg:"Task completed"});

    }catch(err){
        console.log(err);
        return res.status(411).json({msg:"Internal server error"});
    }


})


module.exports=router;