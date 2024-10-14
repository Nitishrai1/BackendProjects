import React, { useState } from "react";

import { Search, Bell, Calendar, ChevronDown } from "lucide-react";


export default function NavBarSection({filterdTodos,setFilterdtodos, searchquery, setSearchquery }) {
  

  let timerId;
  function handleChange(e) {
    const query=e.target.value;

    if(timerId){
      clearTimeout(timerId);
    }


    timerId=setTimeout(async() => {
      setSearchquery(query)
      updateFilteredTodo();
      console.log(`Setup done for ${query}`)
      
    }, 500);


  }

  async function updateFilteredTodo(){
    const token = localStorage.getItem("token");
    const response=await fetch(`http://localhost:3000/user/Search/${searchquery}`,{
      method:'GET',
      headers:{
        'Content-type':"application/json",
        authorization: `${token}`,
      },
    })
    const data=await response.json();
    if(response.ok){
      console.log(`Filtered data fetched succefully ${data.task}`);
      setFilterdtodos(data.task)

    }else{
      console.log(`Error in searching for the filter data`);
    }
  }
 

  return (
    <nav className="bg-[#f2f6fe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>

              <input
                type="text"
                placeholder="Search"
                onChange={handleChange}
                // onKeyDown={handleEnter}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="ml-4 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Calendar className="h-6 w-6" />
            </button>
            <div className="ml-4 flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="/placeholder.svg?height=32&width=32"
                alt="User profile"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Sullivan
              </span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
