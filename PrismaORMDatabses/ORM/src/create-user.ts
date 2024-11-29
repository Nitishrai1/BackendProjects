import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
//   here we will write all the prisma query 
   await prisma.user.create({
        data:{
            id:1,
            email:"nitishraigkp007@gmail.com",
            name:"Nitish",
            
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