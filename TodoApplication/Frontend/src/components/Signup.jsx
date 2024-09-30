import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlesignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json(); //ye hota hai taki token le sake ham
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Sign-up successfull");
      } else {
        alert(`Error in sign up ${data.msg}`);
      }
    } catch (err) {
      console.log("Error in generating token",err);
    }
  };

  return (
    <form onSubmit={handlesignup}>
      <label
        style={{
          border: 3,
          margin: 10,
          padding: 5,
        }}
      >
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label
        style={{
          border: 3,
          margin: 10,
          padding: 5,
        }}
      >
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="Submit">Sign Up</button>
    </form>
  );
};


