const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/todo-app');

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    todos:[
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false 
            },
            completed:{
                type:Boolean,
                default:false
                
            }
        }
    ]

});


const User=mongoose.model('User',UserSchema);

module.exports=User;