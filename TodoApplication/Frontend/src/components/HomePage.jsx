import { useEffect, useState } from "react";
import LeftSidebar from "./SidebarCom/LeftSidebar";
import NavBar from "./DashboardSec/NavBar";
import Todo from "./Cards/Todo";

export default function HomePage({ todos, isAutehnticated, setAuthenticated }) {
  const [searchquery, setSearchquery] = useState("");
  const [notification, setNotification] = useState("");
  const [filterdTodos, setFilterdtodos] = useState([]);

  useEffect(() => {
    // console.log(searchquery);
    if (searchquery === "") {
      setFilterdtodos(todos);
    } else {
      let newfiltertodo = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchquery.toLowerCase())
      );
      setFilterdtodos(newfiltertodo);
    }
    // console.log("filltered todos are as follows");
    // filterdTodos.forEach((todo)=>console.log(todo))
  }, [searchquery, todos]);

  return (
    <div className="flex">
      <LeftSidebar
        isAutehnticated={isAutehnticated}
        setAuthenticated={setAuthenticated}
      />

      <div className="flex-1">
        <NavBar searchquery={searchquery} setSearchquery={setSearchquery} />
        <div>
          <div className="todo-list flex-wrap flex bg-blue">
            {filterdTodos.map((todo) => (
              // eslint-disable-next-line react/jsx-key
              <Todo todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
