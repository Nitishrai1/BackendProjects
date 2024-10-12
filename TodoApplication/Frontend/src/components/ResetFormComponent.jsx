
import { useState } from "react";
import { useParams } from "react-router-dom";


export default function ResetFormComponent(){
    const [newpassword,SetnewPassword]=useState("");
    const [confirmNewpassword,setConfirmpassword]=useState("");
    const [errormsg,setErrormsg]=useState("");
    const {resetToken}=useParams();
    
    const resetPasswordWithToken=async(resetToken,newpassword)=>{
        console.log(`the reset token is ${resetToken}`);
        console.log(newpassword);
        try{
            const response=await fetch(`http://localhost:3000/user/reset-password`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json',


                },
                body:JSON.stringify({
                    password:newpassword,
                    token:resetToken
                })
            });
            const data=await response.json();
            if(response.ok){
                alert("Password reset succesfull");
            }else{
                setErrormsg(data.msg || `falied to reset the passoword`)
            }

        }catch(err){
            console.log("Error in callinf the reset form ");
            setErrormsg(`An error while reseting the password ${err}`);

        }

    }
    const handleSubmit=async(event)=>{
        event.preventDefault();

        if (newpassword !== confirmNewpassword) {
        setErrormsg("Passwords do not match.");
        return;
        }

        await resetPasswordWithToken(resetToken, newpassword);
    }




    return (
        <div>
            <h2>Please enter the credentials</h2>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter your new password"
                        value={newpassword}
                        onChange={(e) => SetnewPassword(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Re Enter your new password"
                        value={confirmNewpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        required
                        />
                </div>
                {errormsg && <p style={{ color: 'red' }}>{errormsg}</p>}
                <button type="submit">Reset Password</button>

            </form>
        </div>
    )
    
}