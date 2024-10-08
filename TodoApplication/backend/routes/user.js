const { Router } = require("express");
const User = require("../db");
const userauth = require("../middlewire/userauthentication");
const router = Router();
const jwt = require("jsonwebtoken");
const { createTodo, updateTodo } = require("../utils");
const jwtkey = "fuckoffhacker";
const {sendSignupEmail}=require("../middlewire/emailnotification")
const crypto=require("crypto");  //this is for resent token generation
const {sendResetPassword}=require("../middlewire/emailnotification")


router.post("/signup", async function (req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      return res.status(400).json({ msg: "User already exist Bad request" });
    }
    const newuser = await User.create({
      username: username,
      password: password,
      todos: [],
    });
    await newuser.save();

    const token = jwt.sign({ username }, jwtkey);
    await sendSignupEmail(username);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});







router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  try{
    if (!user) {
      return res.status(401).json({ msg: "Chala ja bhosdikae" });
    }
    const userId = user._id;
    // console.log(userId)
    const token = jwt.sign({ userId }, jwtkey);
    // console.log(token);
    return res.status(200).json({ token });
  }catch(err){
    return res.status(500).json({msg:"Internal server error"});
  }
});

// logic for forget password
router.post('/forgot-password',async(req,res)=>{
  const {email}=req.body;
  console.log(email);

  try{
    const user=await User.findOne({
      username:email,
    });
    if(!user){
      return res.status(404).json({msg:"user does not exits"});
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken=resetToken;
    user.resetPasswordExpires=Date.now()+3600000;
    await user.save();
    sendResetPassword(email,resetToken);  //isi me wo token bhi url ke sath user ko chala jayega fir yek new api call hoga jo wo token nikal lega or database me chaeck karega agar same hoga to password ko change karne ki permission ahi user ko

    return res.status(200).json({ message: 'Password reset email sent successfully',resetToken });
  }catch(err){
    console.log(`Error occured in the forgot password logic ${err}`);
    return res.status(500).json({msg:"Error in sending teh reset email please try again"})
  }

})

// api for the resent link verification ans actuall reseting the password
router.post('/reset-password/:token',async(req,res)=>{
  const {token}=req.params;
  const {password}=req.body;
  console.log(`Reset logic called with the resettoken as ${token} ans new password is ${password}`)
  try{
    const user=await User.findOne({
      resetPasswordToken:token,
      resetPasswordExpires:{ $gt: Date.now() },  //check the token has not been expired
    })


    if(!user){
      return res.status(404).json({message:"User does not exist"});
    }

    user.password=password;
    user.resetPasswordExpires=undefined;
    user.resetPasswordToken=undefined;
    await user.save();
    console.log("password has been updated successfully")
    res.status(200).json({ message: 'Password has been reset successfully' });
  }catch(err){
    console.log("Error in the reset token route",err);
    return res.status(500).json({message:"Internal server error in the reset link of the token validation"})
  }


  
})







router.get("/todos", userauth, async function (req, res) {
  const id = req.userId;
  
  console.log(`the user id in the get route is ${id}`);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(401).json({ msg: "User does not exist" });
    }
    const todos = user.todos;

    const finaltodo = []; 
    todos.forEach((todo) => {
      if (todo.completed === false) {
        finaltodo.push(todo); 
      }
    });
    return res.json({msg:"Todo fetched succesfully ",todos:finaltodo})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error in fetching the data" });
  }
});








router.get("/alltodos",userauth,async function(req,res){
  const id=req.userId;
  try{
    const user=await User.findById({_id:id});
    if(!user){
      return res.status(401).json({msg:"User does not exist"});
    }
    const todos=user.todos;
    console.log(todos);
    return res.json({msg:"All todo fetched successfull",todos:todos})
  }catch(err){
    console.log("Error occured in fetching the all todos from the mongodb")
    return res.status(500).json({msg:"Internal server error"});
  }

});









router.post("/todo", userauth, async function (req, res) {
  const { title, description, completed } = req.body;
  const id = req.userId;
  console.log(`id is ${id}`);

  const newtodo = createTodo.safeParse({
    title,
    description,
    completed,
  });
  if (!newtodo.success) {
    return res.status(411).json({ msg: "Please enter a valid task of minimum length 1" });
  }

  //   const user = req.UserId; //ise ham us nam ka uiser nikallete hai authertication me se
  const user1 = await User.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        todos: {
          title,
          description,
          completed:false,
        },
      },
    }
  ); //matlab user nam ka koi user nikalet hei db me se or fir uske todo me data dalte hai

  return res.status(200).json({ msg: "Todos updated succesfull" });
});









router.put("/completed", userauth, async function (req, res) {
  // ye to simple hai yek todo ki id milegai usko delete parna hai bass
  const id = req.userId; //ye hai user ki id
  // ab hmako particular todo ko nikalna hai
  const todo = req.body.id; //ye hai perticular todo ki id
  // ab hamko id nam ke user ka todo id wala object me completed true mark karna hai
 console.log(`Todo id is ${todo}`)
 console.log(`user id is ${id}`)
 

  try {
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const particulartodo = user.todos.id(todo);
    
    if (!particulartodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
   

    particulartodo.completed = true;

    await user.save();

    // or we can do that
    // await user.todos.updateById(id,{
    //     completed:true
    // })

    return res.status(200).json({ msg: "Task completed" });
  } catch (err) {
    console.log(err);
    return res.status(411).json({ msg: "Internal server error" });
  }
});

module.exports = router;
