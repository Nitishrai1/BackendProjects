
// implemeting the logic of sending notification using nodemailer library

const nodemailer=require("nodemailer");

const sendSignupEmail=async(email)=>{
  try{
    const transporter=nodemailer.createTransport({
      service: 'Gmail', 
            auth: {
                user: 'nitishraigkp007@gmail.com', // Replace with your email
                pass: 'qxnjwvtcixllmtnq' // Replace with your email password or app-specific password
            }
    })
    const mailoption={
      from:"nitishraigkp007@gmail.com",
      to:email,
      subject:`Account succesfully created`,
      text:`Hello ${email} user  \nYour account has successfully created on Todo App `
    }

    await transporter.sendMail(mailoption);
    console.log(`signup email succesfull`);
  }catch(err){
    console.log(`error occured in nodemailer ${err}`);

  }

}


const sendResetPassword=async (email,resetToken)=>{
  try{
    const transporter=nodemailer.createTransport({
      service:'Gmail',
          auth:{
            user:'nitishraigkp007@gmail.com',
            pass:'qxnjwvtcixllmtnq'
          }

    })
    // reset link de dete hai user ko

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
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

module.exports={sendSignupEmail,sendResetPassword};