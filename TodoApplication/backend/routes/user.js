const { Router } = require("express");
const User = require("../db");
const userauth = require("../middlewire/userauthentication");
const router = Router();
const jwt = require("jsonwebtoken");
const { createTodo, updateTodo } = require("../utils");
const jwtkey = "fuckoffhacker";

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      return res.status(411).json({ msg: "User already exist" });
    }
    const newuser = await User.create({
      username: username,
      password: password,
      todos: [],
    });

    const token = jwt.sign({ username }, jwtkey);

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(411).json({ msg: "internal server error" });
  }
});
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(401).json({ msg: "Chala ja bhosdikae" });
  }
  const userId = user._id;
  // console.log(userId)
  const token = jwt.sign({ userId }, jwtkey);
  console.log(token);
  return res.json({ token });
});
router.get("/todos", userauth, async function (req, res) {
  const id = req.userId;
  
  console.log(`the user id in the get route is ${id}`);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const todos = user.todos;

    return res.status(200).json({ msg: "Data fetch successfully", todos });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Error in fetching the data" });
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
    return res.status(411).json({ msg: "not valid todo" });
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
          completed,
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
      return res.status(404).json({ msg: "User not found" });
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
