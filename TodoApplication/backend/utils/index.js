const zod=require("zod");
// Zod for validateion
const createTodo=zod.object({
    title:zod.string().min(1),
    description:zod.string().min(1)
})

const username=zod.string();
const useremail=zod.string().email();

const updateTodo=zod.object({
    id:zod.string(),
})

module.exports={
    createTodo:createTodo,
    updateTodo:updateTodo,
    uservalidation:useremail,
    usernamevalidated:username
}