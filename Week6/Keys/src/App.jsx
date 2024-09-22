import { useState } from "react";
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
  console.log(`This is before the crypto`);
  const cryptoreturns=exchange1Data.result+exchange2Data.result;
  console.log(`This is after the crypto`);

  const incometake=(cryptoreturns+bankData.bankData)*0.3;
  
  
  
  return <>
    hi there the income tax is {incometake};
  </>
}


export default App;
