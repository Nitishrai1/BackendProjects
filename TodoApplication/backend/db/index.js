
require('dotenv').config()
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
  
const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    todos: [
        {
            title: {
                type: String,
                default:"Anonymus"
            },
            description: {
                type: String,
                default:"Anonymus"
            },
            status: {
                type: String,
                enum: ['started', 'ongoing', 'completed'],
                default:'started'
            },
            completed: {
                type: Boolean,
                default: false,
            },
            startDate: Date,
                
            endDate: Date,

            lastUpdatedDate: {
                type: Date,
                default: Date.now, 
            },
           
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    imageLink: String,
});


const Addressschema = new mongoose.Schema({
    college:String,
    address:String,
    phoneNumber:Number,
    secondryEmail:String,

})
const User = mongoose.model('User', UserSchema);

module.exports = User;