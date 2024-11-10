const { Router } = require("express");
const { User } = require("../db");
const userauth = require("../middlewire/userauthentication");
const router = Router();

const upload = require("../utils/multter"); // Path to your multer config file

router.post("/upload-profile-picture", upload.single("image"), (req, res) => {
  try {
    // console.log(`inside the upload api`)
    const imageUrl = req.file.path; // This will be the URL of the uploaded image from Cloudinary
    // console.log(`the image url in api is ${imageUrl}`)
    res.status(200).json({ imageUrl });
  } catch (error) {
    // console.error('Error uploading image:', error); // Log the error object
    res
      .status(500)
      .json({ error: "Image upload failed!", details: error.message });
  }
});



router.get("/:title", userauth, async (req, res) => {
  const id = req.userId;
  const search = req.params.title;
  try {
    console.log(search);
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }

    const todos = user.todos;
    // console.log(`Todos are ${todos}`);
    // ab apna sare todos par ja kar cehck karnege ki usme seach ka hai kya kuch ki nahi
    const filteredtask = todos.filter((todo) => {
      return todo.title.toLowerCase().includes(search.toLowerCase());
    });
    // console.log(`Filtered task is ${filteredtask}`);
    return res
      .status(200)
      .json({ msg: `Filtered todos fetched successfully`, task: filteredtask });
  } catch (err) {
    // console.log("Error in the seach logic");
    return res
      .status(500)
      .json({ msg: "Error in fetching the searching data" });
  }
});

router.get("/notification/:developerId", async (req, res) => {
  const { developerId } = req.params;
  try {
    const notification = await Notification.find({ developerId }).sort({
      createAt: -1,
    }); //date ke basis par sort kar rahe hai
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch notification" });
  }
});

router.get('/allUser',async(req,res)=>{
  try{
    const user=await User.find();
    const totaluser=[];
    user.map((data)=>{
      const userdata={
        userId:data._id,
        userName:data.username,
        userEmail:data.email,
      }
      totaluser.push(userdata);
    })
    res.status(200).json({totaluser});

  }catch(err){
    console.log(`Err orccured in fettching all the developer`)
    res.status(500).json("Internal server Error");
  }

})

module.exports = router;
