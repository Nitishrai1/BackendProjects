

export default function Alltask({ todos }) {
  const completed = todos.filter((todo) => todo.completed === true).length;
  const remaining = todos.length - completed;
  const all = todos.length;

  const statusItems = [
    { title: "TOTAL", count: all, color: "bg-blue-500" },
    { title: "Done", count: completed, color: "bg-orange-500" },
    { title: "OnGoing", count: remaining, color: "bg-pink-500" },
  ];

  return (
    <div className="flex flex-row gap-4 p-2 h-3/4 w-full justify-between">
      {statusItems.map((item) => (
        <div
          key={item.title}
          className={`flex flex-1 w-40 flex-row items-center p-2 ${item.title === "Done" ? 'bg-green-300' : item.title === "Going On" ? "bg-yellow-300" : "bg-[#ecf2ff]"} rounded-lg shadow-md transition-transform transform hover:scale-105`}

        >
          <div className={`w-3 h-3 ${item.color} rounded-full`} />
          <div className="flex flex-row justify-center items-center ml-2">
            <p className="text-sm text-gray-500 mr-2">{item.title}</p>
            <p
              className={`text-lg font-bold ${item.color.replace(
                "bg-",
                "text-"
              )}`}
            >
              {item.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
