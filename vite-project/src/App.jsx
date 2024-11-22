import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MyComponent />
    </>
    
  )

  
}

function MyComponent(){
  const [count,setCount]=useState(0);

  function increamentCount(){setCount(count+1)};

  return <div>
    <p>{count}</p>
    <button onClick={increamentCount}>Increatement</button>
  </div>
}

export default App
