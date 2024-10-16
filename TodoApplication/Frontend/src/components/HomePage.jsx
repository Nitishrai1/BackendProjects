import { useEffect, useState } from "react";
import LeftSidebar from "./SidebarCom/LeftSidebar";
import NavBar from "./DashboardSec/NavBar";
import Todo from "./Cards/Todo";
import RightSideBar from "./SidebarCom/RightSideCom";
import TimeCom from "./Cards/Tasks/TimeComp";

export default function HomePage({ todos, isAuthenticated, setAuthenticated }) {
  const [searchquery, setSearchquery] = useState("");
  const [notification, setNotification] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);

  // Filter todos based on the search query (you may want to implement this)
  useEffect(() => {
    const results = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchquery.toLowerCase())
    );
    setFilteredTodos(results);
  }, [searchquery, todos]);

  return (
    <div className="flex bg-[#f2f6fe] min-h-screen border-box">
      <LeftSidebar
        isAuthenticated={isAuthenticated}
        setAuthenticated={setAuthenticated}
      />

      <div className="flex-1">
        <NavBar
          searchquery={searchquery}
          filteredTodos={filteredTodos}
          setFilteredTodos={setFilteredTodos}
          setSearchquery={setSearchquery}
        />
        <div className="flex flex-col lg:flex-row gap-4 p-5">
          {/* Main Content Area */}
          <div className="flex-1 p-5 rounded-3xl bg-white h-[650px] w-full lg:w-[800px] overflow-hidden">
            <div className="flex justify-between p-5">
              <div className="poppins-regular text-lg">
                <b>Project</b>
              </div>
              <div>
                <button className="bg-[#744be4] rounded-3xl h-10 px-4 w-36 text-white">
                  Create Project
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-2 poppins-medium">
              <div className="flex justify-between">
                <div>Started</div>
                <button className="text-lg">+</button>
              </div>
              <div className="flex justify-between">
                <div>Ongoing</div>
                <button className="text-lg">+</button>
              </div>
              <div className="flex justify-between">
                <div>Completed</div>
                <button className="text-lg">+</button>
              </div>
            </div>
            <div className="todo-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-2 overflow-y-auto h-[450px] scroll-container">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
              ) : (
                <div className="col-span-full text-center">
                  <h2>No task to complete</h2>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/4 w-full">
            <RightSideBar todos={todos} />
            {/* <TimeCom /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
