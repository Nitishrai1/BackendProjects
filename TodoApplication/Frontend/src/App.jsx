import { useEffect, useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/Createtodo";
import { Todos } from "./components/Todos";
import { Loginform } from "./components/signin";
import { Signup } from "./components/signup";
import { BrowserRouter, Routes,Route } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchdata = async () => {
    const token = localStorage.getItem("Token");
    console.log(`token in localstorage is ${token}`);
    try {
      const response = await fetch("http://localhost:3000/user/todos", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          authorization: `${token}`,
        },
      });
      const res = await response.json([]);
      if (response.ok) {
        console.log(`Data fetched from data base succesull`);
        setTodos(res.todos);
      } else {
        console.log(`Error in fetching the data`);
      }
    } catch (err) {
      console.log(`Error occured ${err}`);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
  
      /* <Signup />
        <br />
        <Loginform />
        <br />
        <CreateTodo />
        <br />
        <button onClick={fetchdata}> Click Me</button>
        <Todos todos={todos} setTodos={setTodos} /> */
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} / >
          <Route path="/login" element={<Loginform />} / >
          <Route path="/todos" element={<Todos todos={todos} setTodos={setTodos}/>} / >
          <Route path="/createtodo" element={<CreateTodo />} / >
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
