export default function Alltask({ todos }) {
    const completed = todos.filter((todo) => todo.completed === true).length;
    const remaining = todos.length - completed;
    const all = todos.length;
  
    const statusItems = [
      { title: "TOTAL", count: all, color: "bg-blue-500" },
      { title: "Done", count: completed, color: "bg-orange-500" },
      { title: "Going On", count: remaining, color: "bg-pink-500" },
    ];
  
    return (
      <div className="flex flex-row  gap-1 p-1 h-full ">
        {statusItems.map((item) => (
          <div
            key={item.title}
            className={`flex items-center p-1 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105`}
          >
            <div className={`w-2 h-3 ${item.color} rounded-full`} />
            <div className="ml-1 overflow-hidden"> 
              <p className="text-xs text-gray-500">{item.title}</p>
              <p
                className={`text-sm font-bold ${item.color.replace("bg-", "text-")}`}
              >
                {item.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  