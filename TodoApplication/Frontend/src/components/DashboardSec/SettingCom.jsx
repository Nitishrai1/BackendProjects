import React, { useState } from 'react';
import { Settings, Lock, Eye, Shield, Server, Bell, ChevronRight, User } from 'lucide-react';
import AccountPreferences from './SettingSection/AccountPreference';
import Notifications from './SettingSection/Notification';
import Security from './SettingSection/Security';
import Visibility from './SettingSection/Visibility';
import TaskSetting from './SettingSection/TaskSetting';


export default function Setting({userdata}){
    const [activesection,setActivesection]=useState("AccountPreferences"); //by default hoga ye


    const activeSectionRendere=()=>{
        switch(activesection){
            case 'AccountPreferences':
                return <AccountPreferences userdata={userdata}/>
            case 'Notification':
                return <Notifications userdata={userdata} />

            case 'Security':
                return <Security />
            case 'Visibilty':
                return <Visibility />
            case 'TaskSetting':
                return <TaskSetting />
            default:
                <AccountPreferences />
        }

    }
    return (
        <div className="flex flex-col md:flex-row bg-gray-900 text-white min-h-screen p-6">
          {/* Sidebar */}
          <div className="md:w-1/4 bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-8">
              <User className="w-10 h-10 rounded-full bg-gray-700 p-1 mr-3" />
              <h2 className="text-2xl font-semibold">Settings</h2>
            </div>
            <ul className="space-y-4">
              <li className={`flex items-center ${activesection==='AccountPreferences' ?  'text-green-400' : ''} cursor-pointer`} onClick={()=>setActivesection('AccountPreferences')}>
                <Settings className="mr-2" />
                Account preferences
              </li>
              <li className={`flex items-center ${activesection==='Security' ?  'text-green-400' : ''} cursor-pointer`}  onClick={()=>setActivesection('Security')}>
                <Lock className="mr-2" />
                Sign in & security
              </li>
              <li className={`flex items-center ${activesection==='Visibility' ?  'text-green-400' : ''} cursor-pointer`}  onClick={()=>setActivesection('Visibility')}>
                <Eye className="mr-2" />
                Visibility
              </li>
              <li className={`flex items-center ${activesection==='TaskSetting' ?  'text-green-400' : ''} cursor-pointer`}  onClick={()=>setActivesection('TaskSetting')}>
                <Shield className="mr-2" />
                Task Setting
              </li>
           
              <li className={`flex items-center ${activesection==='Notification' ?  'text-green-400' : ''} cursor-pointer`} onClick={()=>setActivesection('Notification')}>
                <Bell className="mr-2" />
                Notifications
              </li>
            </ul>
          </div>
    
          {/* Main Content */}
          <div className="md:w-3/4 bg-gray-800 ml-0 md:ml-6 mt-6 md:mt-0 p-6 rounded-lg">
            <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-2">{activesection}</h3>
              {activeSectionRendere()}
            </div>
          </div>
        </div>
      );

}