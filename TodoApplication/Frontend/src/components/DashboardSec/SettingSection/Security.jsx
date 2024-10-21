import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ChangePassword from "../Credientials/ChangePassword";

function ChangeName({ setOperation }) {
  const [newusername, setnewUsername] = useState("");
  async function updatename(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("please re login");
        return;
      }
      const response = await fetch("https://tasky-backend-8kl7.onrender.com/user/changename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ newusername }),
      });
      if (response.ok) {
        alert("Username changed successfully");
        setOperation("Security");
      }
    } catch (err) {
      alert("error in changing the username try again", err);
    }
  }
  return (
    <div className="bg-[#f0ebff] poppins-medium  p-4 rounded-lg">
      <button
        onClick={() => setOperation("Default")}
        className="mb-4 p-2 bg-[white]  text-black rounded-3xl w-[80px] hover:bg-[#f1ecff] transition duration-200"
      >
        Back
      </button>

      <h2 className="text-lg font-semibold mb-4">New Name</h2>

      <form onSubmit={updatename} className="space-y-4">
        <div>
          <input
            type="text"
            id="currentPassword"
            placeholder="Enter current password"
            className="w-full p-2 mt-1   text-white rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setnewUsername(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mb-4 p-2 bg-white   text-black rounded-3xl hover:bg-[#f1ecff] transition duration-200"
        >
          Update Name
        </button>
      </form>
    </div>
  );
}

function Default({ setOperation }) {
  return (
    <div className="poppins-medium  space-y-2">
      <div
        className="flex justify-between items-center cursor-pointer p-2 bg-[#f2f6fe] rounded-lg"
        onClick={() => setOperation("changeUsername")}
      >
        <span>Change username</span>
        <ChevronRight />
      </div>
      <div
        className="flex justify-between items-center cursor-pointer p-2 bg-[#f2f6fe] rounded-lg"
        onClick={() => setOperation("changepassword")}
      >
        <span>Change password</span>
        <ChevronRight />
      </div>
      <div
        className="flex justify-between items-center cursor-pointer p-2 bg-[#f2f6fe] rounded-lg"
        onClick={() => setOperation("addSecondaryMail")}
      >
        <span>Add secondary mail</span>
        <ChevronRight />
      </div>
      <div
        className="flex justify-between items-center cursor-pointer p-2 bg-[#f2f6fe] rounded-lg"
        onClick={() => setOperation("deleteAccount")}
      >
        <span>Delete Account</span>
        <ChevronRight />
      </div>
    </div>
  );
}

export default function Security() {
  const [operation, setOperation] = useState("Default");

  const securityRenderer = () => {
    switch (operation) {
      case "changepassword":
        return <ChangePassword setOperation={setOperation} />;
      case "changeUsername":
        return <ChangeName setOperation={setOperation} />;
      case "addSecondaryMail":
        return <div>Add Secondary Mail Component</div>;
      case "deleteAccount":
        return <div>Delete Account Component</div>;
      default:
        return <Default setOperation={setOperation} />;
    }
  };

  return <div className="bg-[#754ce4]  p-4 rounded-lg">{securityRenderer()}</div>;
}
