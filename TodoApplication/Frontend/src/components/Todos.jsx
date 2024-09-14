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

export function Todos({ todos }) {
  return (
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
