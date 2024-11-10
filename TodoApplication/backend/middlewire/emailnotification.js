
// implemeting the logic of sending notification using nodemailer library

require('dotenv').config();
const nodemailer=require("nodemailer");
const { text } = require('stream/consumers');



const transporter=nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.NODEMAILER_USER_NAME,
    pass:process.env.NODEMAILER_PASS_KEY
  }
})

const sendSignupEmail=async(email)=>{
  try{
   
    const mailoption={
      from:"nitishraigkp007@gmail.com",
      to:email,
      subject:`Account succesfully created`,
      text:`Hello ${email} user  \nYour account has successfully created on Todo App `
    }

    await transporter.sendMail(mailoption);
    // console.log(`signup email succesfull`);
  }catch(err){
    console.log(`error occured in nodemailer ${err}`);

  }

}





const sendResetPassword=async (email,resetToken)=>{
  try{
    
    // reset link de dete hai user ko

    const resetUrl = `https://frontend-sigma-sable-98.vercel.app/reset-password/${resetToken}`;
    console.log("updated the route");
    const mailoption={
      from:'nitishraigkp007@gmail.com',
      to:email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested to reset the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
             ${resetUrl}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.`,
    }
    await transporter.sendMail(mailoption,(error,info)=>{
      if(error){
        console.log("transporter response is failed ",error);
      }else{
        console.log("transposrted response is sucess",info);
      }
    });
    

  }catch(err){
    console.log(`password reset link sending funciton has an err ${err}`);
  

  }
}

const sendLoggedInNotification=async(email)=>{
  try{
   
    const mailoption={
      from:"nitishraigkp007@gmail.com",
      to:email,
      subject:`Logged in successfull`,
      text:`You have Logged in the Todo App successfully`
    }

    await transporter.sendMail(mailoption,(error,info)=>{

      if(error){
        console.log("Error in sending the logging meesage");
      }else{
        console.log("Logged in message sent succesffuly");
      }
    });

  }catch(err){
    console.log("Error in the tranporter")
  }
}




const sendNewTaskcreatedmsg=async(email,task)=>{
  try{
   

    const mailoption={
      from:"nitishraigkp007@gmail.com",
      to:email,
      subject:`New task`,
      text:`New task added on ${task}  in your account \n Good luck for your project`
    }

    await transporter.sendMail(mailoption,(error,info)=>{
      if(error){
        console.log(`Error occured calling task completing mail ${error}`);
      }else{
        console.log(`Task completion mail sent successfull`);
        // console.log(info)
      }

    })

  }catch(err){
    console.log(`Error occured in transporter`);

  }
}

const sendNewTaskcompletedmsg=async(email,task)=>{

  try{
    const mailoption={
      from:"nitishraigkp007@gmail.com",
      to:email,
      
      subject:`Congratulation from tasky`,
      text:`Congratulation on completing your ${task} Project \n We will let you now when the new task come`
    }
    await transporter.sendMail(mailoption,(error,info)=>{
      if(error){
        console.log(`New task added mail sent succesfully`);

      }else{
        console.log(`Error in sending the added task message`);

      }
    })

  }catch(error){
    console.log(`Error in the transporter`);

  }

}

// chat app nitification
// const sentChatLink=async(clientEmail)=>{
//   // const chatLink = `https://frontend-sigma-sable-98.vercel.app/`;
//   try{
//     const mailoption={
//       from:"nitishraigkp007@gmail.com",
//       to:clientEmail,
//        subject:`Update from tasky`,
//       text:`Hello I have looked up your project and i am willing to do the project \n 
//       please follow the link to have a one to one converstaion: `,
//     }

//     await transporter.sendMail(mailoption(Err,info));
//     if(err){
//       console.log("Error occcurend in sending the chat link")
//     }else{
//       console.log('chat link send succesulyy');
//     }
    
//   }catch(err){
//     console.log('error in the nodemialer of chat link')
//   }
// }

module.exports={sendSignupEmail,sendResetPassword,sendLoggedInNotification,sendNewTaskcreatedmsg,sendNewTaskcompletedmsg};