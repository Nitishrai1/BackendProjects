In this project we will come to know about custom hooks in react 


useEffect is used to perform a side effect in react whenever any state changes or when the component mount's and un mount's


function MyComponent(){
    useEffect(()=>{
        console.log("Component mounts);   //this will run every time a new render occur means every time the component gets mounted
        return ()=>{
            console.log("Component unmounted);   //this is will run every time the dependency array changes it will return the previous mounted useeffect funciton call back
        }

    },[]);

    return <div>
    p{count}p

    </div>
}

custom hooks are the hooks that you create that you and other people can use in thier project

<!-- it should start with use -->
it internaly use useEffect or any other hooks

example useTodos which give the list of todos after fetching it from database

const todos=useTodos();


function useTodos(){
    const [todos,settodos]=useState([]);
    useEffect(()=>{
        axios.get("https://.....)
        .then(res=>{
            setTodos(res.data.todos);
        })
    })
}


The latest usestate from SWR is  useSWR which is used to fetch the data from the database which have three argument data error and isLoading


Typescript : it a lossely typed langauage over the javascript. Javascript is a subset of typscript and typscript never run in browser browser only understand javascript basically a typscript file is converted in javascript and then run on browserf


<!-- write a funciton that takes a function as an argument and run the function after 1 sec -->

funciton runafter1sec(fn: ()=>void){     // ()=> this means that the funciton return type is void as my fn funciton is not returing somethingn 
    settimout(fn,1000);
}

funciton fn(){
    console.log("Hello i am nitish);
}

interface is used to implements a class base data

Types used to aggregate the data it is used to provide uniioun intersection

type Employee={
    name:String;
    startDate:Date;
}

interface Manager{
    name:String;
    department:String;
}

type Techlead=Employee & Manager;

const i:Techlead={
    name:"Nitihs,
    startDate:3-23-22;
    department:"Admission"
}


Generics are the language indepenet concept present in many langauges that helps you to create component that works with any data types and help to resolve some compiled time errors

eg.
funciton identity<T>(arg:T):T{
    return arg;
}
<!-- or we can write like -->
funciton identity<T>(arg:string):T{
    return arg;
}
funciton identity<T>(arg:number):T{
    return arg;
}

let output=identity("Nitish")
let output2=identity(100);