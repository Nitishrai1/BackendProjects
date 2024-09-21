

import { useState } from 'react'
import  Headers  from './component/Headers_section'
function App() {
  const [count,setCount]=useState("nitish");
  //ab isme jab bhi rerender hota hia to pura parent hi re render ho jata hau ise bachne ke liye ham state ko niche define kar dete hai
  function updatecount(){
        setCount(`my name is ${Math.random()}`)
      }
  return (
    <div>
    
     
      <button onClick={updatecount}>Update the name</button>
      <Headers title={count}/>
      <Headers title="hello i am Nitish"/> 
      <Headers title="hello i am Nitish"/> 
      <Headers title="hello i am Nitish"/> 

     
    </div>
    
  )
// ye is liye hai taki jab bhi state change ho bass wahi component change ho jo uskko direct use kar raha hai we can also use somthing called reactmemo which stored the data in the memory ye basically karta hai ki agar kisi ka props change nahi hua hai to usko render nah ikarna hai
  // function HeaderwithButton(){
  //   const [count,setCount]=useState("nitish");
  //   function updatecount(){
  //     setCount(`my name is ${Math.random()}`)
  //   }

  //   return <div>
  //     <button onClick={updatecount}>Update the name</button>
  //     <Headers title={count}></Headers>
  //   </div>
  // }
}

export default App
