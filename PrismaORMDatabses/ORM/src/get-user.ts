import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()  //prismaClient ke andar ham log log add kar sakte hai step by step process dekhne ke liye
async function main(){
    
    const users=await prisma.user.findMany({
        where:{
            email:"nitishraigkp007@gmail.com"
        }
    });
    
    for(let i=0;i<users.length;i++){
        console.log(users[i].email);
    }
    const user=await prisma.user.findUnique({
        where:{
            id:1
        },
        include:{
            posts:true
        }
    });
    console.log(user);
}

main()