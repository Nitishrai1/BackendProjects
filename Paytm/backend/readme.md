<!-- The difference between axios and fetch --> -->


axios is much more smarter api then fetch it knows that the data will come in the format of json so we dont need to parse the data in the json format also we have to importa it because it is an external librarry


syntax

const response=await axios.get("https://------",{
    second argument is body
},
{
    third argumnent can be the headers
}
)

console.log(response.data.todos);