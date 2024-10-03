import updatetodo from "./updatetodo";
import { useEffect, useState } from "react";
import CreateTodo from "./Createtodo";
export default function Todos() {
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

  const handleMarkAsCompleted = async (todoId) => {
    try {
      const isUpdated = await updatetodo(todoId);
      if (isUpdated) {
        // Update the local todos state if the update was successful
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === todoId ? { ...todo, completed: true } : todo
          )
        );
      }
    } catch (err) {
      console.log(`Error updating todo: ${err}`);
    }
  };

  return (
    //single top level parent hai jiske andar sab hai
    <div>
      
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
            </div>
          );
        })}
    </div>
  );
}
