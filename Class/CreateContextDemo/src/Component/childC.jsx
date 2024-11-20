import { useContext } from "react";
import { UserConext } from "../App";



export default function ChildC(){
    const {count,setCount}=useContext(UserConext);
    function increament(){
        setCount(count+1);
        
    }

    return <div>
        The value of count is {count}
        <button onClick={increament}>Increament</button>
    </div>
}