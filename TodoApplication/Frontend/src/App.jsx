import {useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/Createtodo'
import { Todos } from './components/Todos'
import { Signinform } from './components/signin'
function App() {
  const [todos,setTodos]=useState([]);
// useEffect(()=>{
//   fetch("http://localhost:3000/user/todos",{
//     method:'GET',
//     headers:{
//       "Content-type":"application/json",
//       "username":"Nitish",
//       "password":"123"
//     }
//   })
//   .then(async function(res){
    
//       if(!res){
//         throw new Error(`http error status code is ${res.status}`)
//       }
//       const json=await res.json();
//       console.log(json);
//       setTodos(json.todos);
    
//   })
//   .catch(function(err){
//       console.log(`error fetching the data ${err}`)
//   })
// },[])
  return (
    
      <div>
        Hello i am nitish
        <Signinform />
        <CreateTodo/>
        <Todos todos={todos}></Todos>
    </div>
  )
}

export default App
