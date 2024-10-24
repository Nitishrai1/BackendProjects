import React, { useState, useEffect, useRef } from "react";
import { Search, Bell, Calendar, ChevronDown } from "lucide-react";
const apiUrl = import.meta.env.VITE_API_URL;
export default function NavBarSection({
  filteredTodos,
  setFilteredTodos,
  searchquery,
  setSearchquery,
  userdata
}) {
  const timerRef = useRef(null);
  const [image, setImage] = useState(null);
  // const [userImage,setUserimage]=useState('');
  const [userinfo,setUserinfo]=useState({userdata});
  const [previewImage, setPreviewImage] = useState('/placeholder.svg'); // Default image
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    if (searchquery.trim() !== "") {
      updateFilteredTodo();
    }
  }, [searchquery]);

  function handleChange(e) {
    const query = e.target.value;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearchquery(query);
      console.log(`Search query updated to: ${query}`);
    }, 500);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Display the image preview before upload
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch(`${apiUrl}/user/Search/upload-profile-picture`,  {
        method:'POST',
        body:formData,
      });
      const data=await response.json();
      if (response.ok) {  //if else is liye laga lo ki hab ok ayega tabhi set hoga url
        setPreviewImage(data.imageUrl);
        console.log(`image link in the frontend is ${data.imageUrl}`);
        const userimage = await updateuserprofile({ userImage: data.imageUrl }); 
        if (!userimage.ok) {
          alert(`Error in saving the image link in the database`);
        } else {
          alert(`Image link saved in the database successfully`);
        }
      } else {
        alert(`Error uploading image: ${data.error}`);
      }
    } catch (error) {
      console.error('Error uploading image inn cloud', error);
    }
  };

  async function updateuserprofile({userImage}) {
    try{
      const token=localStorage.getItem('token');
      console.log(`image link in the update frontedn ${userImage}`)
      const response=await fetch(`${apiUrl}/user/updatePhoto`,{
        method:'POST',
        headers:{
          'Content-Type':"application/json",
          authorization:`${token}`,
        },
        body:JSON.stringify({profilepicture:userImage}),

      });
      if(!response.ok){
        // console.log("error in uplaod the image");
        alert("Error in uploading image please try again");
      }
      const res=await response.json();
      alert(res.msg);
    }catch(err){
      console.log("Error in the backend");
      alert(`Error ${err}`);
      

    }

    
  }


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  async function updateFilteredTodo() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${apiUrl}/user/Search/${searchquery}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(`Filtered data fetched successfully`, data.task);
        setFilteredTodos(data.task);
      } else {
        console.error("Error in fetching the filtered data");
      }
    } catch (error) {
      console.error("Error in fetching the filtered data:", error);
    }
  }

  return (
    <nav className="bg-[#f2f6fe] poppins-light">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Bell className="h-6 w-6" />
            </button>

            <div className="ml-4 flex items-center relative">
              <img
                className="h-8 w-8 rounded-full cursor-pointer"
                src={userdata.ImageLink}
                alt="User profile"
                onClick={toggleDropdown}
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {userdata.username}
              </span>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="ml-2 text-sm font-medium text-gray-700 focus:outline-none"
                >
                  ▼
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-1">
                      <label className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                        Upload Image
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <button
                        onClick={handleImageUpload}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        Save Image
                      </button>
                    </div>
                  </div>
                )}
                
              </div>
              <div className="tasky-heading text-lg m-6 rounded-3xl font-bold text-indigo-600 cursor-pointer">Tasky</div>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
