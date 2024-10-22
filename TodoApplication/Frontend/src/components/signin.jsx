import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import {
  BadRequest,
  Unautherised,
  NotFound,
  InternalserverError,
} from "./Error";

export default function Loginform({ setAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json(); //isme se token nikal lege ham log
      setStatusCode(response.status);
      console.log(response.status);
      if (response.ok) {
        localStorage.setItem("token", res.token);
        setAuthenticated(true);
        alert(`Logged in successfull`);
        navigate("/");
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
  console.log(`Inside the sigin form`);
  function forgetcomponentRenderer(e) {
    e.preventDefault();
    navigate("/forgetpassword");
  }

  function signupRenderer(e) {
    e.preventDefault();
    navigate("/signup");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        {statusCode ? (
          rendereError()
        ) : (
          <form
            className="bg-white rounded-lg p-10 shadow-lg w-96 max-w-lg"
            onSubmit={authenticate}
          >
            <div className="text-black text-3xl font-bold mb-8 text-center">
              Log In
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Username
              </label>
              <input
                id="username"
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="p-3 border border-gray-300 rounded w-full"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={forgetcomponentRenderer}
              className="mt-2 r-0 text-indigo-600 hover:underline"
            >
              Forgot Password?
            </button>

            <button
              type="submit"
              
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded hover:bg-indigo-700 transition duration-200"
            >
              Sign In
            </button>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={signupRenderer}
                className="mt-6 text-indigo-600  hover:underline"
              >
                Sign Up?
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
