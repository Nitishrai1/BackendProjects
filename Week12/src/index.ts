// interface User {
//     name:string,
//     age:number
// }

// function sumOfAge(user1:User,user2:User){
//     return user1.age+user2.age
// }


// const age=sumOfAge({name:"nitish",age:20},{name:"mihir",age:30});
// console.log(age);


// Type kiu use ho sakta hai
// let suppose we have interfacet
interface User {
    id:string,
    name:string,
    age:number,
    email:string,
    password:string

}

// let suppose i want to hit the database and want to change only the name email wo we have ot make another object 
// doing it with type is more optimal
type UpdateProps=Pick<User,'name'|'age'|'email'>  //it is a picklet which pick  name age and email now in this we have to pick all the elemnt and if we want to select some as partial

type UpdatePropsOptional=Partial<UpdateProps> //this will help to you pick the type partially

function UpdateUser(updateProps:UpdateProps){
    // now here you can hit the database and change the value
}

// ReadOnly: this helps to restrict the operation performed on a data type

// ex 

type Person={
    readonly name:string,
    readonly age:string
}


// Records : it is used to make object more readlfull and clean code
// record is only present in the typescript
// ex 
type Users=Record<string,{age?:number,name:string}>; //the first string is telling that the object will have key as a string and value also as a string
const users:Users={
    "1":{
        age:1,
        name:"nitish"
    }
}

// map: we can create a map just like other languages javascript also have a map 
const mp=new Map()
mp.set("nitihs",{age:21,emai:"sdkfjk"})

const p=mp.get("nitihs");


// Exclude: is somthing when we want to exclude something we use exclude
type EventType='click'|'scroll'|'mousemove';
type Excludeevent=Exclude<EventType,'scroll'> //this will exclude the scroll from the eventtype



// type inference : it is used when we want to infer the type of one object into another then we use the type inference
// ex 
import {z} from "zod"

const userProfile=z.object({
    name:z.string(),
    age:z.number(),
    email:z.string()
});

type finalschema=z.infer<typeof,userProfile>;