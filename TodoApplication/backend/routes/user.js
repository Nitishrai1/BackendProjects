require("dotenv").config();
const { Router } = require("express");
const { User, Notification } = require("../db/");
const userauth = require("../middlewire/userauthentication");
const router = Router();
const jwt = require("jsonwebtoken");
const {
  createTodo,
  updateTodo,
  uservalidation,
  usernamevalidated,
} = require("../utils");
const jwtkey = "fuckoffhacker";
const {
  sendSignupEmail,
  sendLoggedInNotification,
  sendNewTaskcreatedmsg,
  sendNewTaskcompletedmsg,
} = require("../middlewire/emailnotification");
const crypto = require("crypto"); //this is for resent token generation
const {
  sendResetPassword,
  sentChatLink,
} = require("../middlewire/emailnotification");

router.post("/signup", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = uservalidation.safeParse(email);

    if (!user.success) {
      return res.status(404).json({ msg: "Please enter a valid email" });
    }

    const uservalidated = user.data;

    const emailNamePart = uservalidated.split("@")[0];
    const randomString = crypto.randomBytes(3).toString("hex");
    const generatedUsername = `${emailNamePart}_${randomString}`;

    const response = await User.findOne({
      email: uservalidated,
    });
    if (response) {
      return res.status(400).json({ msg: "User already exist Bad request" });
    }
    const newuser = await User.create({
      username: generatedUsername,
      email: uservalidated,
      password: password,
      todos: [],
    });

    await newuser.save();

    const token = jwt.sign({ username: generatedUsername }, jwtkey);
    await sendSignupEmail(uservalidated);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("in the try block");
    const user = await User.findOne({ email, password });
    console.log(user);
    if (!user) {
      console.log("no data found");
      return res.status(401).json({ msg: "Chala ja bhosdikae" });
    }
    const userId = user._id;
    console.log(userId);
    const token = jwt.sign({ userId }, jwtkey);
    console.log(token);
    sendLoggedInNotification(email);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// logic for forget password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  // console.log(email);

  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(404).json({ msg: "user does not exits" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    sendResetPassword(email, resetToken); //isi me wo token bhi url ke sath user ko chala jayega fir yek new api call hoga jo wo token nikal lega or database me chaeck karega agar same hoga to password ko change karne ki permission ahi user ko

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully", resetToken });
  } catch (err) {
    // console.log(`Error occured in the forgot password logic ${err}`);
    return res
      .status(500)
      .json({ msg: "Error in sending teh reset email please try again" });
  }
});

// api for the resent link verification ans actuall reseting the password
router.post("/reset-password", async (req, res) => {
  const { password, token } = req.body;
  try {
    // console.log(`Reset logic called with the resettoken as ${token} ans new password is ${password}`)
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, //check the token has not been expired
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    user.password = password;
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    // console.log("password has been updated successfully")
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    // console.log("Error in the reset token route",err);
    return res
      .status(500)
      .json({
        message:
          "Internal server error in the reset link of the token validation",
      });
  }
});

// yek route banate hai notificaiton nikalne ke liye jo unread hai
router.get("/unreadNotification", userauth, async (req, res) => {
  const id = req.userId;

  try {
    const user = await Notification.find({
      developerId: id,
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ msg: "No new notifications" });
    }

    const unreadNotification = user
      .filter((usr) => usr.read === false)
      .map((usr) => ({
        message: usr.message,
        projectDetails: usr.projectDetails,
      }));

    return res.status(200).json({ unreadNotification });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/allNotification", userauth, async (req, res) => {
  const id = req.userId;

  try {
    const user = await Notification.find({
      developerId: id,
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ msg: "No new notifications" });
    }

    const allNotification = user
      .filter((usr) => usr.read === false);

    return res.status(200).json({ allNotification });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

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
    return res.json({ msg: "Todo fetched succesfully ", todos: finaltodo });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ msg: "Error in fetching the data" });
  }
});

router.get("/alltodos", userauth, async function (req, res) {
  const id = req.userId;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(401).json({ msg: "User does not exist" });
    }
    const todos = user.todos;
    // console.log(todos);
    return res.json({ msg: "All todo fetched successfull", todos: todos });
  } catch (err) {
    // console.log("Error occured in fetching the all todos from the mongodb")
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/userProfile", userauth, async (req, res) => {
  const id = req.userId;

  try {
    // console.log(`In the profile route`)
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      // console.log("user does not exist");
      return res.status(404).json({ msg: "user does not exist " });
    }
    const userProfile = {
      email: user.email,
      username: user.username,
      ImageLink: user.imageLink,
      _id: id,
    };
    return res.status(200).json({ msg: `User data are`, userProfile });
  } catch (err) {
    // console.log(`Error in getting the data of the user `);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// update profile picture

router.post("/updatePhoto", userauth, async (req, res) => {
  const { profilepicture } = req.body;

  const id = req.userId;
  try {
    // console.log(`newimage ${profilepicture}`)
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({ msg: "User does not exits" });
    }

    user.imageLink = profilepicture;
    await user.save();
    return res.status(200).json({ msg: "profilepicture uploaded succesfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/changepassword", userauth, async (req, res) => {
  const { newpassword } = req.body;

  const id = req.userId;
  try {
    // console.log(`newpassword ${newpassword}`)
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({ msg: "User does not exits" });
    }

    user.password = newpassword;
    await user.save();
    return res.status(200).json({ msg: "Password changed succesfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/changename", userauth, async (req, res) => {
  const id = req.userId;
  const { newusername } = req.body;

  try {
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({ msg: "user does not exist" });
    }

    user.username = newusername;
    user.save();
    return res.status(200).json({ msg: "Name updated succesfully" });
  } catch (err) {
    // console.log("error in changing th name");

    return res.status(500).json({ msg: "Internal server error", err });
  }
});

// chat link send karne karouter nichec hai

router.post("/sent-Chat-Link", userauth, async (req, res) => {
  const { clientEmail, chatLink } = req.body;
  try {
    await sentChatLink(clientEmail, chatLink);
    res.status(200).json({ msg: "chat link send succesfully" });
  } catch (err) {
    res.status(500).json({ msg: "error in sending the chat link" });
  }
});

router.post("/newtask", userauth, async function (req, res) {
  const { title, description, completed } = req.body;
  const id = req.userId;
  // console.log(`id is ${id}`);

  const newtodo = createTodo.safeParse({
    title,
    description,
    completed,
  });
  if (!newtodo.success) {
    return res
      .status(411)
      .json({ msg: "Please enter a valid task of minimum length 1" });
  }

  //   const user = req.UserId; //ise ham us nam ka uiser nikallete hai authertication me se
  const date = Date.now();
  const user1 = await User.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        todos: {
          title,
          description,
          completed: false,
          startDate: date,
        },
      },
    },
    { new: true } // ye ensures karta hai  that the updated document is returned
  ); //matlab user nam ka koi user nikalet hei db me se or fir uske todo me data dalte hai

  const updatedTask = user1.todos;

  const email = user1.email;
  sendNewTaskcreatedmsg(email, title);

  return res.status(200).json({ msg: "Todos updated succesfull", updatedTask });
});

router.post("/updateTask", userauth, async (req, res) => {
  const id = req.userId;
  const { taskId, title, description } = req.body;
  // console.log(`user id is ${userId}`);
  try {
    // console.log(`User ID from token: ${id}`);
    // console.log(`Received Task ID: ${taskId}`);
    const user = await User.findOne({
      _id: id,
    });
    // console.log(`Todo id is ${todoId} \n title is ${title} \n  description is ${description}`);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const task = user.todos.id(taskId);
    if (!task) {
      console.log("Task not found in user's todos");
      return res.status(404).json({ msg: "Task not found" });
    }

    task.title = title;
    task.description = description;
    console.log("Task updated successfully");

    await user.save();
    return res.status(200).json({ msg: "Task updated succesfully" });
  } catch (err) {
    console.error("Error updating task:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/completed", userauth, async function (req, res) {
  // ye to simple hai yek todo ki id milegai usko delete parna hai bass
  const id = req.userId; //ye hai user ki id
  // ab hmako particular todo ko nikalna hai
  const todoId = req.body.id; //ye hai perticular todo ki id
  // ab hamko id nam ke user ka todo id wala object me completed true mark karna hai
  //  console.log(`Todo id is ${todoId}`)
  //  console.log(`user id is ${id}`)

  //
  try {
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const particulartodo = user.todos.id(todoId);

    if (!particulartodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    particulartodo.status = "completed";

    particulartodo.completed = true;
    particulartodo.endDate = Date.now();
    const useremail = user.email;
    const taskname = particulartodo.title;
    sendNewTaskcompletedmsg(useremail, taskname);

    await user.save();
    const updatedtask = user.todos;

    return res.status(200).json({ msg: "Task completed", updatedtask });
  } catch (err) {
    // console.log(err);
    return res.status(411).json({ msg: "Internal server error" });
  }
});

router.get("/testing",async(req,res)=>{
  return res.status(200).json({msg:"testing api"});
})

module.exports = router;
