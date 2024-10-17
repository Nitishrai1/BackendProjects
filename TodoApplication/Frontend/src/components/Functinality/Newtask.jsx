import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Createtask({setTodos}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const comback = () => {
    navigate("/Homepage");
  };

  const handleAddTodo = async () => {
    setError(""); 
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/newtask", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Todo added successfully: ${data.msg}`);
        setTodos(data.updatedTask)
        console.log(`updated task is `,data.updatedTask);
        // navigate("/Homepage");
      } else {
        setError(`Error adding todo: ${data.msg}`);
      }
    } catch (error) {
      setError(`Error adding todo: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-white mb-4">Add a New Task</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter description"
            className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 mt-4"
          onClick={handleAddTodo}
        >
          Add Task
        </button>

        <button
          className="w-full p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 mt-2"
          onClick={comback}
        >
          Back to Home page
        </button>
      </div>
    </div>
  );
}
