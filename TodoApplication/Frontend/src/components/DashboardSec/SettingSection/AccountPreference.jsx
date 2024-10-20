

import {  ChevronRight } from 'lucide-react';

export default function AccountPreferences({ userdata }) {
  const { username, email, task } = userdata;

  return (
    <div className="bg-[#754ce4] poppins-medium p-4 rounded-lg">
      <div className="space-y-2">
        <div className="flex justify-between items-center cursor-pointer p-2 bg-[#f2f6fe] rounded-lg">
          <span>Name, location, and college</span>
          <ChevronRight />
        </div>
        <div className="flex justify-between items-center cursor-pointer p-2 bg-[#f2f6fe] rounded-lg">
          <span>Personal demographic information</span>
          <ChevronRight />
        </div>
        <div className="flex justify-between items-center cursor-pointer p-2 bg-[#f2f6fe] rounded-lg">
          <span>School/University</span>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
