import { React, useEffect, useState } from "react";
import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";

// Lazy loading components
const CreateTodo = lazy(() => import("./components/Createtodo"));
const Todos = lazy(() => import("./components/Todos"));
const Loginform = lazy(() => import("./components/signin"));
const Signup = lazy(() => import("./components/signup"));

function App() {
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      fetchTodos(token); // Fetch todos if user is authenticated
    } else {
      setAuthenticated(false);
    }
  }, []);

  const fetchTodos = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/user/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });
      const res = await response.json();
      if (response.ok) {
        console.log("Data fetched from database successfully");
        setTodos(res.todos); // Update todos state with the fetched todos
      } else {
        console.log("Error in fetching the data");
      }
    } catch (err) {
      console.log(`Error occurred: ${err}`);
    }
  };

  if (isAuthenticated == null) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div>
      <div style={{ background: "black", color: "white" }}>
        Welcome to my Todo app
      </div>

      <BrowserRouter>
        <Appbar
          isAuthenticated={isAuthenticated}
          setAuthenticated={setAuthenticated}
        />

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Suspense fallback={"Loading..."}>
                  <Todos todos={todos} /> {/* Pass todos as props */}
                </Suspense>
              ) : (
                <Suspense fallback={"Loading..."}>
                  <Loginform setAuthenticated={setAuthenticated} />
                </Suspense>
              )
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={"Loading..."}>
                <Signup />
              </Suspense>
            }
          />

          <Route
            path="/login"
            element={
              <Suspense fallback={"Loading..."}>
                <Loginform setAuthenticated={setAuthenticated} />
              </Suspense>
            }
          />
          <Route
            path="/forgetpassword"
            element={
              <Suspense fallback={"Loading..."}>
                <ForgetPassword />
              </Suspense>
            }
          />
          <Route
            path="/todos"
            element={
              isAuthenticated ? (
                <Suspense fallback={"Loading..."}>
                  <Todos todos={todos} /> {/* Pass todos as props */}
                </Suspense>
              ) : (
                <Suspense fallback={"Loading..."}>
                  <Loginform setAuthenticated={setAuthenticated} />
                </Suspense>
              )
            }
          />
          <Route
            path="/createtodo"
            element={
              isAuthenticated ? (
                <Suspense fallback={"Loading..."}>
                  <CreateTodo />
                </Suspense>
              ) : (
                <Suspense fallback={"Loading..."}>
                  <Loginform setAuthenticated={setAuthenticated} />
                </Suspense>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Appbar({ isAuthenticated, setAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;
