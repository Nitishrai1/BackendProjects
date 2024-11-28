import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
//   here we will write all the prisma query 
    prisma.user.create({
        data:{
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