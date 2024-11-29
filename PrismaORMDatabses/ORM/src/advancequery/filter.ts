// we can perfor advance query to find the data

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()  //prismaClient ke andar ham log log add kar sakte hai step by step process dekhne ke liye


async function main(){
    let res=await prisma.user.findMany({
        where:{
            email:{
                endsWith:"gmail.com"
            },
            posts:{
                some:{
                    published:true,
                },
            },
        },
        include:{
            posts:{
                where:{
                    published:true,
                },
            },
        },
    })
    console.log(res);
}
main()