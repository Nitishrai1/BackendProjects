import { React, useEffect, useState } from "react";
import "./App.css";
import { lazy, Suspense } from "react";
const CreateTodo = lazy(() => import("./components/Createtodo"));
const Todos = lazy(() => import("./components/Todos"));
const Loginform = lazy(() => import("./components/signin"));
const Signup = lazy(() => import("./components/signup"));
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// lazy loding is used to give the page to the user which the user wants not that page which user does not want which will effectevly reduse the fettching the the whole data from backend

function App() {

  return (
    <div>
      <div style={{ background: "black", color: "white" }}>
        Welcome to my Todo app
      </div>

      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route
            path="/signup"
            element={
              <Suspense fallback={"Loding..."}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={"Loding..."}>
                <Loginform />
              </Suspense>
            }
          />
          <Route
            path="/todos"
            element={<Todos/>}
          />
          <Route path="/createtodo" element={<CreateTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  function Appbar() {
    const navigate = useNavigate(); //ye usehook help karta hai bina backend ko fetch kiye rote change karne me kiu ki ye component me use hota hai hai is liye isko browser componente me rakhna padta hai bahar nahi
    return (
      <div>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          {" "}
          Sigin Up
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    );
  }
}

export default App;
