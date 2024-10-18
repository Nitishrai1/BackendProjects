import { useState } from "react";

export default function ChangePassword({ setOperation }) {
  const [currentpassword, setCurrentpassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [reenteredpassword, setreenteredPassword] = useState("");

  async function updatepassword(e) {
    e.preventDefault();
    if (reenteredpassword === newpassword && currentpassword !== newpassword) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in again.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/user/changepassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
            body: JSON.stringify({ newpassword }),
          }
        );

        const msg = await response.json();
        if (response.ok) {
          alert("Password changed successfully");
          setOperation("Security");
        } else {
          alert(`Error in changing password: ${msg.error || "Unknown error"}`);
        }
      } catch (error) {
        alert(`Error in changing password: ${error.message}`);
      }
    } else {
      if (currentpassword === newpassword) {
        alert(
          "New password matches the current password. Please use a different password."
        );
      } else if (newpassword !== reenteredpassword) {
        alert("New password and re-entered password do not match.");
      } else {
        alert("Please enter a valid password.");
      }
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <button
        onClick={() => setOperation("Default")}
        className="mb-4 p-2 bg-gray-600 text-white w-[80px] rounded-3xl hover:bg-gray-700 transition duration-200"
      >
        Back
      </button>

      <h2 className="text-lg font-semibold mb-4">Change Password</h2>

      <form onSubmit={updatepassword} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-gray-300">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            placeholder="Enter current password"
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setCurrentpassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-gray-300">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-300">
            Re-Enter New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Re-enter new password"
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setreenteredPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mb-4 p-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700 transition duration-200"
        >
          Change password
        </button>
      </form>
    </div>
  );
}
