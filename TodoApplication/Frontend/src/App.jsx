import { React, useEffect, useState } from "react";
import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import ResetFormComponent from "./components/ResetFormComponent";
import UserProfile from "./components/DashboardSec/UserProfile";
import Setting from "./components/DashboardSec/SettingCom";
import Createtask from "./components/Functinality/Newtask";
import Edittask from "./components/Functinality/EditTask";

// Lazy loading components
const CreateTodo = lazy(() => import("./components/Functinality/Newtask"));
const Todos = lazy(() => import("./components/Cards/Tasks/Alltask"));
const Loginform = lazy(() => import("./components/signin"));
const Signup = lazy(() => import("./components/signup"));
const HomePage =lazy(()=>import("./components/HomePage"));

function App() {
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [todos, setTodos] = useState([]);
  const [userdata,setUserdata]=useState({});
  const [isLoading,setIsloading]=useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      fetchData(token);
      
    } else {
      setAuthenticated(false);
      setIsloading(false);
    }
  }, [isAuthenticated]);

  // loading ka logic hai niche jab tak fetch nahi hoga logind show hoga
  const fetchData=async (token)=>{
    try{
      setIsloading(true);
      await fetchTodos(token);
      await fetchUserData(token);
      setIsloading(false)

    }catch(err){
      console.log(`Error fetching data: ${err}`);
      setIsloading(false);

    }
  }

  const fetchTodos = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/user/alltodos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const res = await response.json();
      if (response.ok) {
        console.log("Data fetched from database successfully");
        setTodos(res.todos); // Update todos state with the fetched todos
      } else {
        console.log("Error in fetching the data");
      }
    } catch (err) {
      console.log(`Error occurred: ${err}`);
    }
  };

  const fetchUserData=async (token)=>{
    try{
      const response=await fetch("http://localhost:3000/user/userprofile",{
        method:'GET',
        headers:{
          "Content-Type":"application/json",
          authorization:token,
        },

      });
      const res=await response.json();
      if(response.ok){
        setUserdata(res.userProfile);
        console.log("userdata set succesfull");
      }else{
        console.log("Error in fetching the user data");
      }
    }catch(err){
      console.log(`Error occured ${err}`);
    }



  }
  if (isAuthenticated == null || isLoading) {
    return <div>Loading authentication status and data...</div>;
  }

 
  return (
    <div>
      <BrowserRouter>
       

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Suspense fallback={"Loading..."}>
                  <HomePage todos={todos} isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} userdata={userdata} setUserdata={setUserdata}/>
                </Suspense>
              ) : (
                <Suspense fallback={"Loading..."}>
                  <Loginform setAuthenticated={setAuthenticated} />
                </Suspense>
              )
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={"Loading..."}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/Homepage"
            element={
              <Suspense fallback={"Loading..."}>
               <HomePage todos={todos} isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} setTodos={setTodos} userdata={userdata}/>
              </Suspense>
            }
          />
           <Route
            path="/editTask"
            element={
              <Suspense fallback={"Loading..."}>
                <Edittask />
               </Suspense>
            }
          />
           <Route
            path="/userProfile"
            element={
              <Suspense fallback={"Loading..."}>
                <UserProfile todos={todos} userdata={userdata}/>
              </Suspense>
            }
          />
           <Route
            path="/setting"
            element={
              <Suspense fallback={"Loading..."}>
                <Setting  userdata={userdata}/>
               
              </Suspense>
            }
          />


          <Route
            path="/login"
            element={
              <Suspense fallback={"Loading..."}>
                <Loginform setAuthenticated={setAuthenticated} />
              </Suspense>
            }
          />
          <Route
            path="/forgetpassword"
            element={
              <Suspense fallback={"Loading..."}>
                <ForgetPassword />
              </Suspense>
            }
          />
           <Route
            path="/createNewTask"
            element={
              <Suspense fallback={"Loading..."}>
                <Createtask setTodos={setTodos}/>
              </Suspense>
            }
          />
          <Route
            path="/reset-password/:resetToken"
            element={
              <Suspense fallback={"Loading..."}>
                <ResetFormComponent />
              </Suspense>
            }
          />
          <Route
            path="/todos"
            element={
              isAuthenticated ? (
                <Suspense fallback={"Loading..."}>
                    <Todos todos={todos} /> {/* Pass todos as props */}
                </Suspense>
              ) : (
                <Suspense fallback={"Loading..."}>
                  <Loginform setAuthenticated={setAuthenticated} />
                </Suspense>
              )
            }
          />
          <Route
            path="/createtodo"
            element={
              isAuthenticated ? (
                <Suspense fallback={"Loading..."}>
                  <CreateTodo />
                </Suspense>
              ) : (
                <Suspense fallback={"Loading..."}>
                  <Loginform setAuthenticated={setAuthenticated} />
                </Suspense>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
