const zod=require("zod");

const createTodo=zod.object({
    title:zod.string().min(1),
    description:zod.string().min(1)
})


const useremail=zod.string().email();

const updateTodo=zod.object({
    id:zod.string(),
})

module.exports={
    createTodo:createTodo,
    updateTodo:updateTodo,
    uservalidation:useremail
}