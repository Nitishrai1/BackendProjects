import { useEffect, useState } from "react";
import LeftSidebar from "./SidebarCom/LeftSidebar";
import NavBar from "./DashboardSec/NavBar";

export default function HomePage({ todos, isAutehnticated, setAuthenticated }) {
    const [searchquery, setSearchquery] = useState("");
    const [notification, setNotification] = useState("");
    const [filterdTodos,setFilterdtodos]=useState("");

  useEffect(()=>{
    setFilterdtodos(()=>{
        return todos.filter((todo)=>{
            return  todo.title.toLowerCase() === searchquery.toLowerCase();
        })
    
       })
  },[searchquery])


  return (
    <div className="flex">
      <LeftSidebar
        isAutehnticated={isAutehnticated}
        setAuthenticated={setAuthenticated}
      />
  
      <div className="flex-1">
        <NavBar todos={todos} searchquery={searchquery} setSearchquery={setSearchquery} />
      </div>

    </div>
  );
}
