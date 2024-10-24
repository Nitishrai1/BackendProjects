import { ThumbsUp, MessageCircle } from "lucide-react";

import updatetodo from "../Functinality/UpdateTodo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Todo({ todo, setTodos }) {
  const { title = "Untitled Task", description = "No description provided" } =
    todo || {};
    const navigate=useNavigate();

    const [edited,setedited]=useState({todo});


  const markasComplete = async (id) => {
    try {
      const isupdated = await updatetodo(id, setTodos);
      // console.log(`Todo id in frontend is ${todo._id}`);
      if (isupdated) {
        // jo fetch todo hai usko update kar do
        
      }
    } catch (err) {
      console.log("errror in marking the todo as completed");
    }
  };
  function handleEdit() {
    navigate('/editTask', {
      state: { id: todo.id }
    });
  }

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 my-4 mx-2 transition-transform transform hover:scale-105 border border-gray-200">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>

      <div className="rounded-2xl  text-black font-semibold">
        Status:
        <button
          className={`${
            todo.status === "started"
              ? "bg-blue-200 text-blue-800"
              : todo.status === "ongoing"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          } rounded-3xl p-2 ml-2 w-2/3 text-[#1e0059]`}
        >
          {todo.status}
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={handleEdit} className="bg-purple-600 text-white py-2 px-4 rounded-3xl hover:bg-purple-700 transition">
          Edit
        </button>
        {todo.status == "completed" ? (
          <button className="bg-green-500 text-[#1e0059] py-2 px-4  rounded-3xl hover:bg-green-600 transition">
            Task Completed
          </button>
        ) : (
          <button
            onClick={() => markasComplete(todo._id)}
            className="bg-red-500 text-white py-2 px-4  rounded-3xl hover:bg-red-600 transition"
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
}
