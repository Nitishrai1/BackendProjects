import { useState } from "react";

export default function ForgetPassword() {
    const [email,setEmail]=useState("");
   

    const sendResetPassword = async (email) => {
      try {
        const response = await fetch("http://localhost:3000/user/forgot-password", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        const resettoken = data.resetToken;
        console.log(`In the frontend ${resettoken}`);
        if (response.ok) {
          alert(`Reset Email sent successfully`);
          return { success: true, message: "Reset email sent", resettoken };
        } else {
          return { success: false, message: "Failed to send reset email" };
        }
      } catch (err) {
        console.log("Error occurred in the frontend side for sending the reset link", err);
        return { success: false, message: "An error occurred", error: err };
      }
    }
  
    

async function sendEmailToReset(event){
    event.preventDefault();
    const data=await sendResetPassword(email);
    if(data.success){
      console.log("Funciton successfully called")
    }else{
      console.log("Failed to call the funciton");
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
        </div>
        <button>Send Link</button>
      </form>
    </>
  );
}
