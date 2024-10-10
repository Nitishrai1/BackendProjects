import { useState } from "react";

export default function ForgetPassword() {
    const [email,setEmail]=useState("");
    const [newpassword,setNewpassword]=useState("");
    const [retypePass,setRetypepass]=useState("");

const sendResetPassword=async(email,newpassword)=>{

    try{
        const response=await fetch("http://localhost:3000/user/forgot-password",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",           
             },
             body:JSON.stringify({email}),
        });
        const data=await response.json();
        const resettoken=data.resetToken;
        console.log(`Reset password token is ${resettoken}`)
        // ab token mil gya hai chalo resest bhej dete hai
        await resetPasswordWithToken(resettoken, newpassword);

    }catch(err){
        console.log("Error occured in the frontend side for sending the forgetreset link",err);
    }
    
}
const resetPasswordWithToken=async(resettoken,newpassword)=>{

    try{
        const response=await fetch(`http://localhost:3000/user/reset-password/${resettoken}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({password:newpassword}),
        })

        const data=response.json();
        alert(`backend responed to the request id ${data.message}`)
        console.log(`message is ${data.message}`)
      

    }catch(err){

        console.log(`Error in reseting the password ${err}`);
        
    }


}

     function sendEmailToReset(){
        if(newpassword===retypePass){
            sendResetPassword(email,newpassword);
        }else{
            alert("Please enter the same password in both input box");
        }

    }




  return (
    <>
      <form action="" onSubmit={sendEmailToReset}>
        <div>
          <div>
            <input type="text" placeholder="Enter email" onChange={function(e){
                setEmail(e.target.value);
            }}/>
          </div>
          <div>
            <input type="password" placeholder="Enter new password" onChange={function(e){
                setNewpassword(e.target.value)
            }}/>
          </div>
          <div>
            <input type="password" placeholder="Re Enter the password"  onChange={function(e){
                setRetypepass(e.target.value)
            }}/>
          </div>
        </div>
        <button>Send Link</button>
      </form>
    </>
  );
}
