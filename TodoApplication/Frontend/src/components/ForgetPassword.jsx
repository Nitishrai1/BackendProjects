import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const sendResetPassword = async (email) => {
    try {
      const response = await fetch("https://tasky-backend-8kl7.onrender.com/user/forgot-password", {
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

  async function sendEmailToReset(event) {
    event.preventDefault();
    const data = await sendResetPassword(email);
    if (data.success) {
      console.log("Function successfully called");
    } else {
      console.log("Failed to call the function");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <form
          className="bg-white rounded-lg p-10 shadow-lg w-96 max-w-lg"
          onSubmit={sendEmailToReset}
        >
          <div className="text-black text-3xl font-bold mb-8 text-center">
            Forgot Password
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Enter Email
            </label>
            <input
              id="email"
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded hover:bg-indigo-700 transition duration-200"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
}
