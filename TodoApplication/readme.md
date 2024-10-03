## Todo Application
It is a simple todo application
It has the following features

Anyone can create a todo
Anyone can update todo
Anyonbe can mark the todo done

Prop drilling: it is some thing that passing the states to the child component whenever the state is used by the childcomponent but it makes the code so ugly to read hence the context api come into the picture 

Context api: it is used to do the state management also it helps the send the data directly to the component which need it thus save us from prop drilling  also lets keep all state logic outside of your core react component
syntax to create a context api is as follows


create a funciton and export the function 

wrapp the component which will use the context api for their uses 
<CountContext.Provider value={count}>
  <Count setCount={SetCount}>
</CountContext.Provider>;

Now you can use this context api in your code whenever you want to use this component you just need to wriote thos
const count=useContext(CountContext); // this will let you to use the count state vriabel inside the child component