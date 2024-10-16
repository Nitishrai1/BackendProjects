import { Mail, CheckCircle2, Circle, ListTodo } from "lucide-react"


export default function UserProfile({ todos  , userdata}) {
  const { email, username, ImageLink } = userdata

  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const remainingTodos = totalTodos - completedTodos
 

  return (
    <div className="w-full mt-2 max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500" />
        <div className="relative z-10 flex flex-col items-center pt-10 pb-8">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img 
              src={ImageLink} 
              alt={`${username}'s profile`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${username}&background=random`;
              }}
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">{username}</h2>
          <div className="flex items-center mt-2 text-white/80">
            <Mail className="w-4 h-4 mr-2" />
            <span>{email}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center justify-center p-4 bg-blue-100 rounded-lg">
            <ListTodo className="w-6 h-6 mr-2 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-600">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-800">{totalTodos}</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-green-100 rounded-lg">
            <CheckCircle2 className="w-6 h-6 mr-2 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-800">{completedTodos}</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-yellow-100 rounded-lg">
            <Circle className="w-6 h-6 mr-2 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-600">Remaining</p>
              <p className="text-2xl font-bold text-yellow-800">{remainingTodos}</p>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4">Tasks</h3>
        <div className="h-[200px] rounded-md border border-gray-200 p-4 overflow-y-auto">
          {todos.length > 0 ? (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mr-2 ${
                    todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {todo.completed ? 'Done' : 'Pending'}
                  </span>
                  <span className="text-sm">{todo.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  )
}