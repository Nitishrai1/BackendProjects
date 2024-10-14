

export default function Todo({todo}){
    return(
        <div className="bg-white shadow-md rounded-lg p-4 my-5 mx-2 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold">Task: {todo.title}</h3>
            <p className="text-gray-600">Description {todo.description}</p>
        </div>
    )
}