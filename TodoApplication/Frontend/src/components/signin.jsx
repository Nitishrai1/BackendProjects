import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadRequest,
  Unautherised,
  NotFound,
  InternalserverError,
} from "./Error";
export default function Loginform({ setAuthenticated }) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [statusCode, setStatusCode] = useState(null);
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
      setStatusCode(response.status);
      console.log(response.status);
      if (response.ok) {
        localStorage.setItem("token", res.token);
        setAuthenticated(true);
        alert(`Logged in successfull`);
        navigate("/todos");
      } else {
        alert("Incorrect username or password");
      }
    } catch (err) {
      console.log("Error occured", err);
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
      
        {statusCode ?(
          rendereError()
        ):
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
     
      }
      
    </div>
  );
}
