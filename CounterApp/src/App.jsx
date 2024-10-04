import { useState } from "react";

import "./App.css";
import {  useRecoilState, useRecoilValue,RecoilRoot } from "recoil";
import { countAtom } from "./store/atom/count";

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
    </div>
  );
}
function Button() {
  const [count,setCount]=useRecoilState(countAtom);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Incremnet
      </button>
      <br />
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrement
      </button>
    </div>
  );
}

export default App;
