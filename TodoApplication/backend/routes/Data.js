const { Router } = require("express");
const { User,Notification } = require("../db");
const userauth = require("../middlewire/userauthentication");
const router = Router();

const { upload,upload2} = require("../utils/multter"); // Path to your multer config file

router.post("/upload-profile-picture", upload.single("image"), (req, res) => {
  try {
    // console.log(`inside the upload api`)
    if(!req.file){
      return res.status(404).json({msg:"Please upload the image"})
    }
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
// yaha par projectDetails upload karne ka route banega
router.post("/upload-projectFile", upload2.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Please upload the correct file" });
    }

    const projectUrl = req.file.path;
    return res.status(200).json({ projectUrl });
  } catch (error) {
    console.error("Error uploading project file:", error);
    return res.status(500).json({
      error: "Project file upload failed",
      details: error.message,
    });
  }
});


router.post("/save-projectDetails", async (req, res) => {
  const { developerId, message, clientEmail, projectUrl } = req.body;

  try {
    if (!developerId || !message || !clientEmail || !projectUrl) {
      return res.status(400).json({
        msg: "Missing required fields (developerId, message, clientEmail, or projectUrl)",
      });
    }

    const notification = new Notification({
      developerId: developerId,
      clientEmail: clientEmail,
      message: message,
      projectDetails: projectUrl,
    });

    await notification.save();

    return res.status(200).json({ msg: "Notification saved in the database" });
  } catch (error) {
    console.error("Error saving project details to the database:", error);
    return res.status(500).json({
      error: "Saving project details to the database failed",
      details: error.message,
    });
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
        imageLink:data.imageLink,
      }
      totaluser.push(userdata);
    })
    res.status(200).json({totaluser});

  }catch(err){
    console.log(`Err orccured in fettching all the developer`)
    res.status(500).json("Internal server Error");
  }

})






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

router.post("/updateNotification",userauth,async (req,res)=>{
  const id=req.userId;
  try{
    const notificaiton =await Notification.find({
      developerId:id
    })

    if(!notificaiton || notificaiton.length===0){
      return res.status(404).json({msg:'Notificaiotn not found for the user'});
    }
    // ab pura notificaiton par iterate karke read ko true kar do
    for (let noti of notifications) {
      noti.read = true;
      await noti.save();  
    }
    return res.status(200).json({msg:"All notification have been marked as read"});

  }catch(err){
    return res.status(500).json({msg:"Internal server error"});

  }
})


module.exports = router;
