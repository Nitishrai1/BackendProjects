import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


function Navbar(){
  return <div >
   
      
     <ul style={{display:"flex", justifyContent:"space-around", alignItems:"center"  }}>
      <li>Home</li>
      <li>About</li>
      <li>service</li>
      <li>Contact</li>
     </ul>
    </div>


}

function CardWrapper({children }){
  // yaha par main logic lagega

  return (
    <div style={{backgroundColor:"lightgray" , border:2, padding:5}}>
      {children }
      </div>
  )
}
function App() {
  
  return <>
  <CardWrapper>
    <Navbar/>
  </CardWrapper>

  </>
}


export default App;
