/*
todos=[
    {
    title:"I will code ",
    description:"I will code daily 7 hours ",
    completed:false

    }

]



*/

// {todos}  this is called destructuring we can also use props and to extract the tods use const todos= props.todos
import { useState } from "react";
export function Todos( {todos,setTodos} ) {

  const updatetodo=async (id) => {
    try{
     const token=localStorage.getItem('Token');
     console.log(token);
     const response=await fetch("http://localhost:3000/user/completed",{
       method:'PUT',
       headers: {
         "content-Type": "application/json",
         'authorization':token
       },
       body: JSON.stringify({ id }),
     })
     const data=await response.json();
     if (response.ok) {
      alert(`Result is ${data.msg}`);
      setTodos(todos.map((todo)=>{
        todo._id===id?{...todo, completed:true}:todo
      })) 
    } else {
      alert(`Error: ${data.msg || "Could not update todo"}`);
    }
    }catch(err){
     console.log('error in updating the todo',err)
    }
       
   }

  return (  //single top level parent hai jiske andar sab hai
    <div>
      {todos.map(function (todo) {
        return (
          // eslint-disable-next-line react/jsx-key
          <div key={todo._id}>
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
            {!todo.completed && (
              <button
                style={{
                  padding: 10,
                  margin: 10,
                }}
                onClick={() => {
                  updatetodo(todo._id);
                }}
              >
                Mark as completed
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
