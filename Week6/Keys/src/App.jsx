import { useCallback, useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [exchange1Data,setData1]=useState({});
  const [exchange2Data,setData2]=useState({});
  const [bankData,setBankdata]=useState({});

  useEffect(()=>{
    setData1({
      result:100
    });
  },[])


  useEffect(()=>{
    setData2({
      result:100
    });
  },[])
  

  useEffect(()=>{
    setTimeout(()=>{
      setBankdata({
        bankData:200
      },5000);
    })
  },[])
  // console.log(`This is before the crypto`);
  // const cryptoreturns=useMemo(()=>{
  //   return exchange1Data.result+exchange2Data.result;
  // },[exchange1Data,exchange2Data]) // ye use hota hai taki ye bar bar render na ho bass tabhi ho jab ya to setData1 ya to setData2 change hoga tab hi call hoga both the useeffect ans the useMemo do the same task but the only difference is that useMemo return something but useEffect does not return anything

  // use callback is liye hota hai agar koi fucntion change na ho to usko re-render nahi karna hai 
  // what is the difernece bwteen useCallback and memo 
  // memo is used to avoid the re-render of the component if its props are not changed
  // useCallback is used to avoid the re-render of the funciton if this paramerte not cahnged also if if use memo in place of useCallback then it will not funciton becaues function are not same even though thier segnetaure and work are same in javascript
  // console.log(`This is after the crypto`);
  const calculateCrypto=useCallback(function(){
    return exchange1Data+exchange2Data;
  },[exchange1Data,exchange2Data])

  const incometake=(calculateCrypto+bankData.bankData)*0.3;

  // useRef(): this hooks is used for two case first is to get the access of the dom element ans want to change it but it isnot good because you override what the react has done
  // const App(){
  //   const [data,setData]=useState(200);

  //   const divRef=useRef();

  //   useEffect(()=>{
  //     setTimeout(()=>{
  //       divRef.current.innserHtml='10'
  //     },5000)
  //   })

  //   return <div>THE VALUE OF THE DATA IS <div ref={divRef}>{data}</div></div>

  // }


  
  
  
  return <>
    hi there the income tax is {incometake};
  </>
}


export default App;
