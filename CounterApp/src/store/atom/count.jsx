// we have to create a recoil state managemenet tool for hte count state for the counter app
//  in the code i am seperately defining the state so that is can be used from the other component

// to use this state in your component you have to use the following states
// 1: useRecoil : this is same as the useState hook which helps you to set the value of the state 
// 2: userecoilValue: this is used to use the value just give it dont update the value
// 3: useSetRecoil: this is for only updating the variable but do not allow you to use the variable

// 4: selectors : they are used when we use the direived state from some another funciton and get back a value then we can use selecetors 
import {atom, selector} from "recoil"
export const countAtom=atom({
    key:"countAtom",
    default:0
});

// we can create a selectors to render the contenet when the state changes
export const evenSelector=selector({
    key:"evenSelector",
    get:(props)=>{
        const count=props.get(countAtom); //whenever the countAtom changes make sure that you re run the evenselector  the count variable depends upon the countAtom function
        return count%2==0;
    }
})