import { createContext, useState } from 'react'

import './App.css'
import ChildA from './Component/childA';

// create context outside of the App Comp
const UserConext=createContext();

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>

    <UserConext.Provider value={{count,setCount}} >
      <ChildA />
    </UserConext.Provider>

    
     
       
    </>
  )
}

export default App
export {UserConext}
