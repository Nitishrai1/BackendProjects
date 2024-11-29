import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()  //prismaClient ke andar ham log log add kar sakte hai step by step process dekhne ke liye

async function main() {
//   here we will write all the prisma query 
   await prisma.post.create({
        data:{
            title:"Web dev",
            content:"full stack app",
            author:{
                connect:{
                    id:1
                }
            }
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })