import { useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
export default function ResetFormComponent() {
  const [newpassword, SetnewPassword] = useState("");
  const [confirmNewpassword, setConfirmpassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const { resetToken } = useParams();

  const resetPasswordWithToken = async (resetToken, newpassword) => {
    console.log(`The reset token is ${resetToken}`);
    console.log(newpassword);
    try {
      const response = await fetch(`${apiUrl}/user/reset-password`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          password: newpassword,
          token: resetToken,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Password reset successful");
      } else {
        setErrormsg(data.msg || `Failed to reset the password`);
      }
    } catch (err) {
      console.log("Error in calling the reset form ");
      setErrormsg(`An error occurred while resetting the password: ${err}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newpassword !== confirmNewpassword) {
      setErrormsg("Passwords do not match.");
      return;
    }

    await resetPasswordWithToken(resetToken, newpassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <form
          className="bg-white rounded-lg p-10 shadow-lg w-96 max-w-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-black text-3xl font-bold mb-8 text-center">Reset Password</h2>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              value={newpassword}
              onChange={(e) => SetnewPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your new password"
              value={confirmNewpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="p-3 border border-gray-300 rounded w-full"
              required
            />
          </div>

          {errormsg && <p className="text-red-500 mb-4">{errormsg}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded hover:bg-indigo-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
