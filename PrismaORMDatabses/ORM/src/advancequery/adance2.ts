import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()  //prismaClient ke andar ham log log add kar sakte hai step by step process dekhne ke liye


async function main() {
    let res=await prisma.user.findMany({
        take:2,  //this is also called offset where you take some value and skip other int this we take 2 value and skip 0
        skip:0
    })
    console.log(res);
    
}
main()