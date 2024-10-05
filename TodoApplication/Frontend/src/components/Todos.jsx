import updatetodo from "./updatetodo";
import { useEffect, useState } from "react";
import CreateTodo from "./Createtodo";
import {  Route, useNavigate } from "react-router-dom";
export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [Alltodos,setAllTodos]=useState([]);
  const navigate=useNavigate();
  const fetchdata = async () => {
    const token = localStorage.getItem("Token");
    console.log(`token in localstorage is ${token}`);
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
    getalltodos();
  }, []);

  const handleMarkAsCompleted = async (todoId) => {
    try {
      const isUpdated = await updatetodo(todoId);
      if (isUpdated) {
        fetchdata();
      }
    } catch (err) {
      console.log(`Error updating todo: ${err}`);
    }
  };
  const addtodo=()=>{
    console.log("inside the new todo compoenent");
    navigate("/createtodo")
  }
  const getalltodos=async ()=>{
    const token = localStorage.getItem("Token");
 
    try{
      const response=await fetch("http://localhost:3000/user/alltodos",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },

      });
      const res=await response.json();
      setAllTodos(res.todos);
      AlltodoRenderer(Alltodos)
      

    }catch(err){
      console.log("Error occured fechting all the todos",err);
    }
  }


  

  return (
    //single top level parent hai jiske andar sab hai
    <div>
      <div>
        <button onClick={addtodo}> Add todo</button>
        <button onClick={getalltodos}>Get all todos</button>
      </div>
      {todos
        .filter((todo) => !todo.completed)
        .map(function (todo) {
          return (
            // eslint-disable-next-line react/jsx-key
            <div>
              <h1>{todo.title}</h1>
              <h1>{todo.description}</h1>
              <button
                style={{
                  padding: 10,
                  margin: 10,
                }}
              >
                {todo.completed == true ? "Completed" : "Not completed"}
              </button>
              <button
                style={{
                  padding: 10,
                  margin: 10,
                }}
                onClick={() => {
                  handleMarkAsCompleted(todo._id);
                }}
              >
                Mark as completed
              </button>
              {Alltodos.length > 0 && <AlltodoRenderer todos={Alltodos} />}
            </div>
          );
        })}
    </div>
  );
}

function AlltodoRenderer({ todos }) {
  console.log("Inside the alltodorenderer ",todos)
  let a = 1;
  return (
    <div>
      <h1>Previous todos are as follows</h1>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{a++}: Task</h1>
          <h1>Title: {todo.title}</h1>
          <p>Desc: {todo.description}</p>
        </div>
      ))}
    </div>
  );
}
