import { useState } from "react";
import {
  BadRequest,
  Unautherised,
  NotFound,
  InternalserverError,
} from "./Error";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
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
  const renderError = () => {
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

  function loginRenderer(e) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      {statusCode ? (
        renderError()
      ) : (
        <form
          className="bg-white rounded-lg p-10 shadow-lg w-96 max-w-lg"
          onSubmit={handleSignup}
        >
          <div className="text-black text-3xl font-bold mb-8 text-center">
            Sign Up
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              id="username"
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-8">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              id="password"
              className="p-3 border border-gray-300 rounded w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded hover:bg-indigo-700 transition duration-200"
          >
            Sign Up
          </button>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={loginRenderer}
              className="mt-6 text-indigo-600 hover:underline"
            >
              Log In?
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
