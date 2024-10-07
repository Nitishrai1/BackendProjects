import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loginform ({setAuthenticated}) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const authenticate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const res = await response.json(); //isme se token nikal lege ham log
      if (response.ok) {
        localStorage.setItem("token", res.token);
        setAuthenticated(true);
        alert(`Logged in successfull`)
        navigate("/todos")
        
      } else {
        alert("Incorrect username or password");
        
        
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
