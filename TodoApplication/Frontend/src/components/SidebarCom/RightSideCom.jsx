import { User } from "lucide-react";
import { useState } from "react";
import DoununtCom from "../Cards/DoununtCom";
import Alltask from "../Cards/Tasks/Alltask";
import TimeCom from "../Cards/Tasks/TimeComp";

export default function RightSideBar({ todos }) {
  const [accuracy, setAccuracy] = useState();

  return (
    <div className="bg-white p-5 rounded-3xl shadow flex flex-col h-full">
      <div className="bg-white flex flex-col w-full h-full">
        <div className="bg-white w-full h-1/4 rounded-lg">
          <div className="bg-[#f2f6fe] rounded-2xl m-5 p-2 flex items-center">
            <div>
              <p className="text-sm">Selected</p>
              <h4 className="text-md font-semibold poppins-regular">
                Design Team
              </h4>
            </div>
            <div className="ml-auto">
              <User size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white w-full h-1/2 rounded-lg p-2">
          <DoununtCom todos={todos} />
        </div>
        <div className="bg-white w-full h-1/4 flex flex-col rounded-lg p-2">
          <h2 className="text-lg font-semibold poppins-regular">Progress</h2>
          <Alltask todos={todos} />
          {/* <TimeCom /> */}
          
        </div>
      </div>
      
    </div>
  );
}
