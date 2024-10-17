import React from 'react';
import { Settings, Lock, Eye, Shield, Server, Bell, ChevronRight, User } from 'lucide-react';


export default function Setting({userdata}){
    return (
        <div className="flex flex-col md:flex-row bg-gray-900 text-white min-h-screen p-6">
          {/* Sidebar */}
          <div className="md:w-1/4 bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-8">
              <User className="w-10 h-10 rounded-full bg-gray-700 p-1 mr-3" />
              <h2 className="text-2xl font-semibold">Settings</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center text-green-400 cursor-pointer">
                <Settings className="mr-2" />
                Account preferences
              </li>
              <li className="flex items-center cursor-pointer">
                <Lock className="mr-2" />
                Sign in & security
              </li>
              <li className="flex items-center cursor-pointer">
                <Eye className="mr-2" />
                Visibility
              </li>
              <li className="flex items-center cursor-pointer">
                <Shield className="mr-2" />
                Data privacy
              </li>
              <li className="flex items-center cursor-pointer">
                <Server className="mr-2" />
                Advertising data
              </li>
              <li className="flex items-center cursor-pointer">
                <Bell className="mr-2" />
                Notifications
              </li>
            </ul>
          </div>
    
          {/* Main Content */}
          <div className="md:w-3/4 bg-gray-800 ml-0 md:ml-6 mt-6 md:mt-0 p-6 rounded-lg">
            <div className="space-y-6">
              {/* Profile Information Section */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                    <span>Name, location, and industry</span>
                    <ChevronRight />
                  </div>
                  <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                    <span>Personal demographic information</span>
                    <ChevronRight />
                  </div>
                  <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                    <span>Verifications</span>
                    <ChevronRight />
                  </div>
                </div>
              </div>
    
              {/* Display Section */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Display</h3>
                <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                  <span>Dark mode</span>
                  <ChevronRight />
                </div>
              </div>
    
              {/* General Preferences Section */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">General Preferences</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                    <span>Language</span>
                    <ChevronRight />
                  </div>
                  <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                    <span>Content language</span>
                    <ChevronRight />
                  </div>
                  <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                    <span>Autoplay videos</span>
                    <span className="text-green-400">On</span>
                  </div>
                  <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                    <span>Sound effects</span>
                    <span className="text-green-400">On</span>
                  </div>
                  <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-800 rounded-lg">
                    <span>Showing profile photos</span>
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

}