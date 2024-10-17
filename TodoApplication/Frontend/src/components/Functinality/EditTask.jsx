import { useLocation } from "react-router-dom";

export default function Edittask({ todoids }) {
  const location = useLocation();
  const { id} = location.state || {};
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
