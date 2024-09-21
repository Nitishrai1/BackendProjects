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

export function Todos( {todos} ) {
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
    } else {
      alert(`Error: ${data.msg || "Could not update todo"}`);
    }
    }catch(err){
     console.log('error in updating the todo')
    }
       
   }

  return (  //single top level parent hai jiske andar sab hai
    <div>
      {todos.map(function (todo) {
        return (
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
              onClick={()=>{
                updatetodo(todo._id)
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
