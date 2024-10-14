import { useEffect, useState } from "react";
import LeftSidebar from "./SidebarCom/LeftSidebar";
import NavBar from "./DashboardSec/NavBar";
import Todo from "./Cards/Todo";

export default function HomePage({ todos, isAuthenticated, setAuthenticated }) {
  const [searchquery, setSearchquery] = useState("");
  const [notification, setNotification] = useState("");

  const [filterdTodos, setFilterdtodos] = useState(todos);

  return (
    <div className="flex bg-[#f2f6fe] min-h-screen border-box">
      <LeftSidebar
        isAuthenticated={isAuthenticated}
        setAuthenticated={setAuthenticated}
      />

      <div className="flex-1">
        <NavBar
          searchquery={searchquery}
          filterdTodos={filterdTodos}
          setFilterdtodos={setFilterdtodos}
          setSearchquery={setSearchquery}
        />
        <div className="p-5 min-h-screen">
          <div className="grid grid-cols-12 gap-4 rounded-3xl min-h-full">
            {/* Left grid column */}
            <div className="col-span-8 p-5 rounded-3xl bg-white">
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
              <div className="grid grid-cols-3 gap-5 mx-2 poppins-medium">
                <div className="flex justify-between">
                  <div>started</div>
                  <button className="text-lg">+</button>
                </div>
                <div className="flex justify-between">
                  <div>ongoing</div>
                  <button className="text-lg">+</button>
                </div>
                <div className="flex justify-between">
                  <div>completed</div>
                  <button className="text-lg">+</button>
                </div>
              </div>
              <div className="todo-list flex flex-wrap">
                {filterdTodos.map((todo) => (
                  // eslint-disable-next-line react/jsx-key
                  <Todo todo={todo} />
                ))}
              </div>
            </div>
            {/* Right grid column */}
            <div className="col-span-4 bg-[#f2f6fe]">
              <div className="bg-white p-5 rounded-3xl shadow">
                <div>Hello</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
