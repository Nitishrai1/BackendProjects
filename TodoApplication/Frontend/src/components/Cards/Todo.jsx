import { ThumbsUp, MessageCircle } from 'lucide-react'

import updatetodo from "../Functinality/UpdateTodo";

export default function Todo({  todo = {} }) {
  const { title = 'Untitled Task', description = 'No description provided' } = todo || {};

   const  markasComplet = async (id)=>{
    try{
        const isupdate=await updatetodo(id);
        if(isupdate){
            // jo fetch todo hai usko update kar do
        }

    }catch(err){
        console.log("errror in marking the todo as completed")

    }


  }

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 my-4 mx-2 transition-transform transform hover:scale-105 border border-gray-200">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
      </div>
      
      <div className="flex justify-between items-center">
       
        
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <ThumbsUp className="w-5 h-5 mr-1" />
            <span>6</span>
          </button>
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>4</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition">
          Edit
        </button>
        <button onClick={()=>markasComplet(todo._id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
          Mark as Completed
        </button>
      </div>
    </div>
  )
}