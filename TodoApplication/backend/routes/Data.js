const { Router } = require("express");
const User = require("../db");
const userauth = require("../middlewire/userauthentication");
const router = Router();




const upload = require('../utils/multter'); // Path to your multer config file

router.post('/upload-profile-picture', upload.single('image'), (req, res) => {
  try {
    // console.log(`inside the upload api`)
    const imageUrl = req.file.path; // This will be the URL of the uploaded image from Cloudinary
    // console.log(`the image url in api is ${imageUrl}`)
    res.status(200).json({ imageUrl });
  } catch (error) {
    // console.error('Error uploading image:', error); // Log the error object
    res.status(500).json({ error: 'Image upload failed!', details: error.message });
  }
});

module.exports = router;





router.get("/:title",userauth,async (req,res)=>{
    const id=req.userId;
    const search = req.params.title;
    try{
        console.log(search);
        const user=await User.findOne({
            _id:id
        })
        if(!user){
            res.status(404).json({msg:"User not found"});
        }
        

        
        const todos=user.todos;
        // console.log(`Todos are ${todos}`);
        // ab apna sare todos par ja kar cehck karnege ki usme seach ka hai kya kuch ki nahi
        const filteredtask=todos.filter((todo)=>{
            return todo.title.toLowerCase().includes(search.toLowerCase());

        })
        // console.log(`Filtered task is ${filteredtask}`);
        return res.status(200).json({msg:`Filtered todos fetched successfully`,task:filteredtask})

        
    }catch(err){
        // console.log("Error in the seach logic");
        return res.status(500).json({ msg: "Error in fetching the searching data" });
    }

})


  







module.exports=router;