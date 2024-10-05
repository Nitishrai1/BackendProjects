import { useMemo, useState } from "react";

import "./App.css";
import {  useRecoilState, useRecoilValue,RecoilRoot, useSetRecoilState } from "recoil";
import { countAtom, evenSelector } from "./store/atom/count";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  return (
    <div>
      <CounterRender />
      <Button />
    </div>
  );
}

function CounterRender() {
  const count = useRecoilValue(countAtom);
  return (
    <div>
      <b>Count:{count}</b>
      <EvencountRenderer />
    </div>
  );
}
function Button() {
  // const [count,setCount]=useRecoilState(countAtom); //we can optimize the code by using the useSetRecoilState() this will not re render the button which need not to be rendered again and again
  const setCount=useSetRecoilState(countAtom);
  console.log("Button re-rendered");
  return (
    <div>
      <button
        onClick={() => {
          setCount(count=>count+1);
        }}
      >
        Incremnet
      </button>
      <br />
      <button
        onClick={() => {
          setCount(count=>count-1);
        }}
      >
        Decrement
      </button>
    </div>
  );
}
function EvencountRenderer(){
  // const count=useRecoilValue(countAtom); 
  // insted of using hard core condition use usememo to handle the conditionall rendering
  // const iseven=useMemo(()=>{
  //   return count%2==0;
  // },[count]) replacing all this stuff from selectoirs
  const isEven=useRecoilValue(evenSelector);
  return <div>
   { isEven?"It is even":null}
  </div>
}

export default App;
