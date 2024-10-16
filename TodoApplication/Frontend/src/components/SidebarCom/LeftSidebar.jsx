import  { useState } from 'react'
import { Home, User, Mail, Clock, FileText, Settings, LogOut, Menu } from 'lucide-react'
import {  useNavigate } from 'react-router-dom'

export default function CollapsibleSidebar ({isAutehnticated,setAuthenticated}) {
  const [isOpen, setIsOpen] = useState(true)
  const navigate=useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  function Logout(){
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  }
  function userProfilerender(){
    navigate("/userProfile");
  }

  return (
    <div className={`flex flex-col h-max-screen ${isOpen ? 'w-16' : 'w-12'} bg-purple-800 text-white transition-all duration-300`}>
      <div className="flex-1 flex flex-col justify-between py-4">
        <div className="space-y-4">
          {/* Logo / Toggle Button */}
          <button onClick={toggleSidebar} className="w-full flex justify-center">
            {isOpen ? (
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="flex space-x-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            ) : (
              <Menu size={24} />
            )}
          </button>

          {/* Navigation Icons */}
          {isOpen && (
            <nav className="flex flex-col items-center space-y-4">
              <button className="p-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Home size={24} />
              </button>
              <button className="p-2 rounded-lg hover:bg-purple-700 transition-colors" onClick={userProfilerender}>
                <User size={24}  />
              </button>
              <button className="p-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Mail size={24} />
              </button>
              <button className="p-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Clock size={24} />
              </button>
              <button className="p-2 rounded-lg hover:bg-purple-700 transition-colors">
                <FileText size={24} />
              </button>
              <button className="p-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Settings size={24} />
              </button>
            </nav>
          )}
        </div>

        {/* Logout Button */}
        {isOpen && (
          <div className="flex justify-center">
            <button className="p-2 rounded-lg hover:bg-purple-700 transition-colors">
              <LogOut size={24} onClick={Logout} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

