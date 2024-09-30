import { useState } from "react";

export default function Loginform () {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const res = await response.json(); //isme se token nikal lege ham log
      if (response.ok) {
        localStorage.setItem("Token", res.token);
      alert(`Logged in successfull`)
      } else {
        
        console.log("sigin Successfull");
      }
    } catch (err) {
      console.log("Error occured", err);
    }
  };
  return (
    <form action="" onSubmit={authenticate}>
      <input
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="name"
        onChange={function (e) {
          setName(e.target.value);
        }}
      />
      <br />
      <input
        style={{
          padding: 10,
          margin: 10,
        }}
        type="password"
        placeholder="password"
        onChange={function (e) {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button
        style={{
          padding: 10,
          margin: 10,
        }}
      >
        Click Me
      </button>
    </form>
  );
};
