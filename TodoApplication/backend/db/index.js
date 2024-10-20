const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/todo-app');
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