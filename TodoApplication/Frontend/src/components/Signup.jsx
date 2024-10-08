import { useState } from "react";
import {
  BadRequest,
  Unautherised,
  NotFound,
  InternalserverError,
} from "./Error";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusCode, setStatusCode] = useState(null);

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
      setStatusCode(response.status);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Sign-up successfull");
      } else {
        alert(`Error in sign up ${data.msg}`);
      }
    } catch (err) {
      console.log("Error in generating token", err);
    }
  };
  const rendereError = () => {
    console.log("eror called");
    switch (statusCode) {
      case 400:
        return <BadRequest />;

      case 401:
        return <Unautherised />;

      case 404:
        return <NotFound />;

      case 500:
        return <InternalserverError />;

      default:
        return null;
    }
  };

  return (
    <div>
      {statusCode ? (
        rendereError()
      ) : (
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
      )}
    </div>
  );
}
